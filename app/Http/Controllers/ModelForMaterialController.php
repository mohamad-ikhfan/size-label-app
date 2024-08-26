<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModelForMaterialResource;
use App\Models\ModelForMaterial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModelForMaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modelForMaterialAll = new ModelForMaterial();
        $query = ModelForMaterial::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("model_name")) {
            $query->where("model_name", "like", "%" . request("model_name") . "%");
        }
        if (request("material_type")) {
            $query->where("material_type", "like", "%" . request("material_type") . "%");
        }
        if (request("material_size")) {
            $query->where("material_size", "like", "%" . request("material_size") . "%");
        }
        if (request("wide")) {
            $query->where("wide", "like", "%" . request("wide") . "%");
        }

        /**@disregard P1013*/
        $modelForMaterials = ModelForMaterialResource::collection($query->orderBy($sortField, $sortDirection)->paginate(15)->onEachSide(1));

        return Inertia::render('ModelForMaterials/Index', [
            'modelForMaterials' => $modelForMaterials,
            'queryParams' => request()->query() ?: null,
            'filters' => [
                'material_type' => $modelForMaterialAll->all()->pluck('material_type', 'material_type'),
                'material_size' => $modelForMaterialAll->all()->pluck('material_size', 'material_size'),
                'wide' => $modelForMaterialAll->all()->pluck('wide', 'wide')->map(fn($v) => $v === 1 ? 'Yes' : 'No'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'model_name' => 'required|string|unique:model_for_materials',
            'material_type' => 'required|string',
            'material_size' => 'required|string',
            'wide' => 'required|integer',
        ]);

        ModelForMaterial::create([
            'model_name' => strtoupper($request->model_name),
            'material_type' => $request->material_type,
            'material_size' => $request->material_size,
            'wide' => $request->wide,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'model_name' => 'required|string|unique:model_for_materials,model_name,' . $id,
            'material_type' => 'required|string',
            'material_size' => 'required|string',
            'wide' => 'required|integer',
        ]);

        $modelForMaterial = ModelForMaterial::findOrFail($id);
        $modelForMaterial->update([
            'model_name' => strtoupper($request->model_name),
            'material_type' => $request->material_type,
            'material_size' => $request->material_size,
            'wide' => $request->wide,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $modelForMaterial = ModelForMaterial::findOrFail($id);
        $modelForMaterial->delete();
    }
}
