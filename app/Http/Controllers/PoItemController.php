<?php

namespace App\Http\Controllers;

use App\Http\Resources\PoItemResource;
use App\Models\PoItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PoItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = PoItem::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        /**@disregard P1013*/
        $poItems = PoItemResource::collection($query->orderBy($sortField, $sortDirection)->paginate(15)->onEachSide(1));

        return Inertia::render('PoItems/Index', [
            'poItems' => $poItems,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $poItem = PoItem::findOrFail($id);
        $poItem->delete();
    }
}
