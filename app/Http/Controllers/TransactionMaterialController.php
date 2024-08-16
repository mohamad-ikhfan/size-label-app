<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionMaterialResource;
use App\Models\Material;
use App\Models\StockMaterial;
use App\Models\TransactionMaterial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionMaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = TransactionMaterial::query();

        $sortField = request("sort_field", "date");
        $sortDirection = request("sort_direction", "desc");

        $transactionMaterials = TransactionMaterialResource::collection($query->orderBy($sortField, $sortDirection)->orderBy('updated_at', 'desc')->paginate(15)->onEachSide(1));

        return Inertia::render('TransactionMaterial/Index', [
            'transactionMaterials' => $transactionMaterials,
            'materials' => Material::all(),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'type' => 'required|string',
            'material_id' => 'required|integer',
            'qty' => 'required|numeric',
            'transaction_by' => 'required|integer',
        ]);

        $stockMaterial = StockMaterial::latest()->first();
        $newStock = StockMaterial::create(['qty' => $stockMaterial->qty ?? 0 + $request->qty]);

        TransactionMaterial::create([
            'date' => $request->date,
            'type' => $request->type,
            'material_id' => $request->material_id,
            'qty' => $request->qty,
            'first_stock_id' => $stockMaterial->id ?? null,
            'last_stock_id' => $newStock->id,
            'transaction_by' => $request->transaction_by,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|date',
            'type' => 'required|string',
            'material_id' => 'required|integer',
            'qty' => 'required|numeric',
            'transaction_by' => 'required|integer',
        ]);

        $stockMaterial = StockMaterial::latest()->first();
        $newStock = StockMaterial::create(['qty' => $stockMaterial->qty ?? 0 + $request->qty]);

        $transactionMaterial = TransactionMaterial::findOrFail($id);
        $transactionMaterial->update([
            'date' => 'required|date',
            'type' => 'required|string',
            'material_id' => 'required|integer',
            'qty' => 'required|numeric',
            'transaction_by' => 'required|integer',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $transactionMaterial = TransactionMaterial::findOrFail($id);
        $transactionMaterial->delete();
    }
}