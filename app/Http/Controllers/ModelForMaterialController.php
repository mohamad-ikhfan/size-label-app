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
        $query = ModelForMaterial::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $filterGenders = collect();
        $filterCategories = collect();
        $filterMaterialTypes = collect();
        $filterMaterialSizes = collect();
        $filterWides = collect();

        foreach ($query->get() as $modelForMaterial) {
            $filterGenders->push(['value' => $modelForMaterial->gender]);
            $filterCategories->push(['value' => $modelForMaterial->category]);
            $filterMaterialTypes->push(['value' => $modelForMaterial->material_type]);
            $filterMaterialSizes->push(['value' => $modelForMaterial->material_size]);
            $filterWides->push(['value' => $modelForMaterial->wide]);
        }

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
            'filterMaterialTypes' => $filterMaterialTypes->sortBy('value', descending: true)->unique('value')->toArray(),
            'filterMaterialSizes' => $filterMaterialSizes->sortBy('value', descending: true)->unique('value')->toArray(),
            'filterWides' => $filterWides->sortBy('value', descending: true)->unique('value')->toArray(),
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
            'model_name' => 'required|string|unique:model_for_materials',
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
