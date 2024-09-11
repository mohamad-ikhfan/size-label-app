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
        return Inertia::render('ModelForMaterials/Index', [
            'modelForMaterials' => ModelForMaterialResource::collection(ModelForMaterial::latest()->get())
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