<?php

namespace App\Http\Controllers;

use App\Http\Resources\SchedulePrintResource;
use App\Models\ModelForMaterial;
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
        $query = SchedulePrint::query();

        $schedulePrints = SchedulePrintResource::collection($query->orderBy('schedule', 'desc')->paginate(15)->onEachSide(1));

        return Inertia::render('SchedulePrints/Index', [
            'schedulePrints' => $schedulePrints,
            'users' => User::all()
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
}