<?php

namespace App\Http\Controllers;

use App\Http\Resources\SchedulePrintResource;
use App\Models\CalendarHolidayId;
use App\Models\ModelForMaterial;
use App\Models\PoItem;
use App\Models\ReportPrint;
use App\Models\SchedulePrint;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchedulePrintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schedulePrintAll = new SchedulePrint();
        $query = SchedulePrint::query();

        if (request("status")) {
            if (request("status") === "printed") {
                $query->where("status", request("status"));
            } else {
                $query->where("status", request("status"))->orWhere("status", null);
            }
        } else {
            $query->where("status", "printing")->orWhere("status", null);
        }

        $schedulePrints = SchedulePrintResource::collection($query->orderBy('schedule', 'asc')->paginate(15)->onEachSide(1));

        return Inertia::render('SchedulePrints/Index', [
            'schedulePrints' => $schedulePrints,
            'users' => User::all(),
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'line' => 'required|integer|min:1',
            'schedule' => 'nullable|date',
            'release' => 'required|date',
            'style_number' => 'required|string',
            'model_name' => 'required|string',
            'qty' => 'required|numeric',
            'status' => 'nullable|string',
            'status_updated_by' => 'nullable|integer',
            'status_updated_at' => 'nullable|date',
        ]);

        $modelForMaterial = ModelForMaterial::where('model_name', $request->model_name)->first();

        SchedulePrint::create([
            'line' => $request->line,
            'schedule' => $request->schedule,
            'release' => $request->release,
            'style_number' => $request->style_number,
            'model_name' => strtoupper($request->model_name),
            'qty' => $request->qty,
            'model_for_material_id' => $modelForMaterial->id ?? null,
            'status' => $request->status,
            'status_updated_by' => $request->status_updated_by,
            'status_updated_at' => $request->status_updated_at,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'line' => 'required|integer|min:1',
            'schedule' => 'nullable|date',
            'release' => 'required|date',
            'style_number' => 'required|string',
            'model_name' => 'required|string',
            'qty' => 'required|numeric',
            'status' => 'nullable|string',
            'status_updated_by' => 'nullable|integer',
            'status_updated_at' => 'nullable|date',
        ]);

        $modelForMaterial = ModelForMaterial::where('model_name', $request->model_name)->first();

        $schedulePrint = SchedulePrint::findOrFail($id);
        $schedulePrint->update([
            'line' => $request->line,
            'schedule' => $request->schedule,
            'release' => $request->release,
            'style_number' => $request->style_number,
            'model_name' => strtoupper($request->model_name),
            'qty' => $request->qty,
            'model_for_material_id' => $modelForMaterial->id ?? null,
            'status' => $request->status,
            'status_updated_by' => $request->status_updated_by,
            'status_updated_at' => $request->status_updated_at,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $schedulePrint = SchedulePrint::findOrFail($id);
        $schedulePrint->delete();
    }

    public function generate(Request $request)
    {
        $request->validate([
            'from_release' => 'required|date',
        ]);

        $scheduleOnPrints = SchedulePrint::where('status', 'printing')->get();

        SchedulePrint::truncate();

        $poItems = PoItem::select('line', 'release', 'style_number', 'model_name')
            ->groupBy('line', 'release', 'style_number', 'model_name')
            ->where('release', '>=', $request->from_release)
            ->get();

        foreach ($poItems as $poItem) {
            $spkPublishes = collect();
            $qtyOrigins = collect();

            $newPoItems = PoItem::where($poItem->toArray())
                ->get();
            foreach ($newPoItems as  $newPoItem) {
                if (!str_contains($newPoItem->remark, 'JX2')) {
                    if (!str_contains($newPoItem->remark, 'PM')) {
                        if (!empty($newPoItem->spk_publish)) {
                            $spkPublishes->push(now()->parse($newPoItem->spk_publish)->getTimestamp());
                        }
                        if (!empty($newPoItem->po_number)) {
                            $qtyOrigins->push($newPoItem->qty);
                        }
                    }
                }
            }

            if ($qtyOrigins->count() > 0) {
                $schedule = null;
                if (isset($spkPublishes) && !empty($spkPublishes->avg())) {
                    $schedule = now()->parse(date('Y-m-d', $spkPublishes->avg()));
                    foreach (CalendarHolidayId::all() as $calendar) {
                        if ($calendar->date == $schedule->format('Y-m-d')) {
                            $schedule->subDay();
                        }
                    }
                    while ($schedule->isWeekend()) {
                        $schedule->subDay();
                    }
                }

                $modelForMaterial = ModelForMaterial::where('model_name', $poItem->model_name)->first();

                $data = [
                    'line' => $poItem->line,
                    'schedule' => $schedule ? $schedule->format('Y-m-d') : null,
                    'release' => $poItem->release,
                    'style_number' => $poItem->style_number,
                    'model_name' => $poItem->model_name,
                    'qty' => $qtyOrigins->sum(),
                    'model_for_material_id' => $modelForMaterial->id ?? null
                ];
                SchedulePrint::create($data);
            }
        }

        foreach ($scheduleOnPrints as $value) {
            $schedulePrint = SchedulePrint::where([
                'line' => $value->line,
                'schedule' => $value->schedule,
                'release' => $value->release,
                'style_number' => $value->style_number,
                'model_name' => $value->model_name,
            ])->fist();
            $schedulePrint->update([
                'status' => $value->status,
                'status_updated_at' => $value->status_updated_at,
                'status_updated_by' => $value->status_updated_by,
            ]);
        }
    }

    public function syncToPrinted()
    {
        $schedulePrints = SchedulePrint::all();
        foreach ($schedulePrints as $schedulePrint) {
            $reportPrintGroups = ReportPrint::select('line', 'release', 'style_number')
                ->groupBy('line', 'release', 'style_number')
                ->where([
                    'line' => $schedulePrint->line,
                    'release' => $schedulePrint->release,
                    'style_number' => $schedulePrint->style_number,
                ])
                ->get();

            foreach ($reportPrintGroups as $reportPrintGroup) {
                $printDates = collect();
                $qtyTotals = collect();
                foreach (ReportPrint::where($reportPrintGroup->toArray())->get() as $reportPrint) {
                    $printDates->push($reportPrint->printed_at);
                    $qtyTotals->push($reportPrint->qty);
                    $printedBy = $reportPrint->printed_by;
                }

                if ($schedulePrint->qty == $qtyTotals->sum()) {
                    $schedulePrint->update([
                        'status' => 'printed',
                        'status_updated_at' => $printDates->max(),
                        'status_updated_by' => isset($printedBy) ? $printedBy : null
                    ]);
                } elseif ($qtyTotals->sum() > $schedulePrint->qty) {
                    $schedulePrint->update([
                        'status' => 'printed',
                        'status_updated_at' => $printDates->max(),
                        'status_updated_by' => isset($printedBy) ? $printedBy : null
                    ]);
                } elseif ($qtyTotals->sum() < $schedulePrint->qty) {
                    $schedulePrint->update([
                        'status' => 'printing',
                        'status_updated_at' => $printDates->max(),
                        'status_updated_by' => isset($printedBy) ? $printedBy : null
                    ]);
                }
            }
        }
    }

    public function printing(Request $request, $id)
    {
        $schedulePrint = SchedulePrint::findOrFail($id);
        $request->validate([
            'status' => 'required|string',
            'status_updated_by' => 'required|integer',
            'status_updated_at' => 'required|date',
        ]);
        $schedulePrint->update([
            'status' => $request->status,
            'status_updated_by' => $request->status_updated_by,
            'status_updated_at' => $request->status_updated_at,
        ]);
    }
}