<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReportPrintResource;
use App\Jobs\ImportReportPrintJob;
use App\Models\HistoryImportFile;
use App\Models\ReportPrint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportPrintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reportPrintsAll = new ReportPrint;
        $query = ReportPrint::query();

        $sortField = request("sort_field", "printed_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("printed_at")) {
            $query->where("printed_at", "like", "%" . request("printed_at") . "%");
        }
        if (request("line")) {
            $query->where("line", "like", "%" . request("line") . "%");
        }
        if (request("release")) {
            $query->where("release", "like", "%" . request("release") . "%");
        }
        if (request("po_number")) {
            $query->where("po_number", "like", "%" . request("po_number") . "%");
        }
        if (request("style_number")) {
            $query->where("style_number", "like", "%" . request("style_number") . "%");
        }
        if (request("model_name")) {
            $query->where("model_name", "like", "%" . request("model_name") . "%");
        }
        if (request("special")) {
            $query->where("special", "like", "%" . request("special") . "%");
        }
        if (request("remark")) {
            $query->where("remark", "like", "%" . request("remark") . "%");
        }
        if (request("printed_by")) {
            $query->where("printed_by", "like", "%" . request("printed_by") . "%");
        }

        /**@disregard P1013*/
        $reportPrints = ReportPrintResource::collection($query->orderBy($sortField, $sortDirection)->orderBy('printed_by', 'desc')->paginate(15)->onEachSide(1));

        return Inertia::render('ReportPrints/Index', [
            'reportPrints' => $reportPrints,
            'queryParams' => request()->query() ?: null,
            'filters' => [
                'printed_at' => $reportPrintsAll->orderBy('printed_at', 'desc')->get()->pluck('printed_at', 'printed_at')->map(fn($val) => now()->parse($val)->format('d-F-Y')),
                'release' => $reportPrintsAll->orderBy('release', 'desc')->get()->pluck('release', 'release')->map(fn($val) => now()->parse($val)->format('m/d y')),
                'special' => $reportPrintsAll->get()->pluck('special', 'special'),
                'remark' => $reportPrintsAll->get()->pluck('remark', 'remark'),
                'printed_by' => $reportPrintsAll->get()->pluck('printed_by', 'printed_by')->map(fn($val) => $reportPrintsAll->where('printed_by', $val)->first()->printedBy->name),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'printed_at' => 'required|date',
            'line' => 'required|integer',
            'po_number' => 'required|numeric',
            'release' => 'required|date',
            'style_number' => 'required|string',
            'model_name' => 'required|string',
            'special' => 'nullable|string',
            'qty' => 'required|numeric|min:1',
            'remark' => 'nullable|string',
            'printed_by' => 'required|integer',
        ]);

        ReportPrint::create([
            'printed_at' => $request->printed_at,
            'line' => $request->line,
            'po_number' => $request->po_number,
            'release' => $request->release,
            'style_number' => strtoupper($request->style_number),
            'model_name' => strtoupper($request->model_name),
            'special' => $request->special,
            'qty' => $request->qty,
            'remark' => $request->remark,
            'printed_by' => $request->printed_by,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'printed_at' => 'required|date',
            'line' => 'required|integer',
            'po_number' => 'required|numeric',
            'release' => 'required|date',
            'style_number' => 'required|string',
            'model_name' => 'required|string',
            'special' => 'nullable|string',
            'qty' => 'required|numeric|min:1',
            'remark' => 'nullable|string',
            'printed_by' => 'required|integer',
        ]);

        $reportPrint = ReportPrint::findOrFail($id);
        $reportPrint->update([
            'printed_at' => $request->printed_at,
            'line' => $request->line,
            'po_number' => $request->po_number,
            'release' => $request->release,
            'style_number' => strtoupper($request->style_number),
            'model_name' => strtoupper($request->model_name),
            'special' => $request->special,
            'qty' => $request->qty,
            'remark' => $request->remark,
            'printed_by' => $request->printed_by,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $reportPrint = ReportPrint::findOrFail($id);
        $reportPrint->delete();
    }

    public function import(Request $request)
    {
        $request->validate(([
            'import_file' => 'required|file'
        ]));

        $dateFormat = '_(' . now()->format('d-m-y') . '_' . time() . ')';
        $file = $request->file('import_file');
        $ext = $file->getClientOriginalExtension();
        $fileName = str_replace("." . $ext, "", $file->getClientOriginalName()) . $dateFormat;
        $mimeType = $file->getMimeType();
        $size = $file->getSize();
        $path = 'app/public/imports';

        $file->move(storage_path($path), $fileName . "." . $ext);

        ImportReportPrintJob::dispatch(auth()->guard('web')->user(), $fileName . "." . $ext);

        HistoryImportFile::create([
            'name' => $fileName,
            'extension' => $ext,
            'mime_type' => $mimeType,
            'size' => $size,
            'path' => $path,
        ]);
    }
}
