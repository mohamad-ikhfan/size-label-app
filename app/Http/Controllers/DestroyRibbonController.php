<?php

namespace App\Http\Controllers;

use App\Http\Resources\DestroyRibbonResource;
use App\Models\DestroyRibbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DestroyRibbonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = DestroyRibbon::query();

        $destroyDates = collect();
        $destroyByes = collect();

        foreach ($query->get() as $destroyRibbon) {
            $destroyDates->push(['key' => $destroyRibbon->destroyed_at, 'value' => now()->parse($destroyRibbon->destroyed_at)->format('d-F-Y')]);
            $destroyByes->push(['key' => $destroyRibbon->destroyed_by, 'value' => $destroyRibbon->destroyedBy->name]);
        }

        $sortField = request("sort_field", "destroyed_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("destroyed_at")) {
            $query->where("destroyed_at", "like", "%" . request("destroyed_at") . "%");
        }
        if (request("destroyed_by")) {
            $query->where("destroyed_by", "like", "%" . request("destroyed_by") . "%");
        }

        /**@disregard P1013*/
        $destroyRibbons = DestroyRibbonResource::collection($query->orderBy($sortField, $sortDirection)->orderBy('updated_at', 'desc')->paginate(15)->onEachSide(1));
        return Inertia::render('DistroyRibbons/Index', [
            'destroyRibbons' => $destroyRibbons,
            'queryParams' => request()->query() ?: null,
            'filterDestroyDates' => $destroyDates->sortBy('key', descending: true)->unique('key')->toArray(),
            'filterDestroyByes' => $destroyByes->sortBy('value')->unique('key')->toArray()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'destroyed_at' => 'required|date',
            'destroyed_by' => 'required|integer',
            'qty' => 'required|integer|min:1'
        ]);

        DestroyRibbon::create([
            'destroyed_at' => $request->destroyed_at,
            'destroyed_by' => $request->destroyed_by,
            'qty' => $request->qty,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'destroyed_at' => 'required|date',
            'qty' => 'required|integer|min:1'
        ]);

        $destroyRibbon = DestroyRibbon::findOrFail($id);
        $destroyRibbon->update([
            'destroyed_at' => $request->destroyed_at,
            'qty' => $request->qty,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $destroyRibbon = DestroyRibbon::findOrFail($id);
        $destroyRibbon->delete();
    }
}