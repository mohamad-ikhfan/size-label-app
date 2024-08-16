<?php

namespace App\Http\Controllers;

use App\Http\Resources\MaterialResource;
use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Material::query();

        $sortField = request("sort_field", "updated_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("code")) {
            $query->where("code", "like", "%" . request("code") . "%");
        }
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("description")) {
            $query->where("description", "like", "%" . request("description") . "%");
        }

        $materials = MaterialResource::collection($query->orderBy($sortField, $sortDirection)->paginate(15)->onEachSide(1));

        return Inertia::render('Materials/Index', [
            'materials' => $materials,
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:materials',
            'name' => 'required|string',
            'description' => 'nullable|string'
        ]);

        Material::create([
            'code' => strtoupper($request->code),
            'name' => strtoupper($request->name),
            'description' => $request->description,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'code' => 'required|unique:materials,code,' . $id,
            'name' => 'required|string',
            'description' => 'nullable|string'
        ]);

        $material = Material::findOrFail($id);
        $material->update([
            'code' => strtoupper($request->code),
            'name' => strtoupper($request->name),
            'description' => $request->description,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $material = Material::findOrFail($id);
        $material->delete();
    }
}