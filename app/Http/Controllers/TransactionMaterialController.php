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
        $transactionMaterialAll = new TransactionMaterial;
        $query = TransactionMaterial::query();

        $sortField = request("sort_field", "date");
        $sortDirection = request("sort_direction", "desc");

        if (request("date")) {
            $query->where("date", "like", "%" . request("date") . "%");
        }
        if (request("type")) {
            $query->where("type", "like", "%" . request("type") . "%");
        }
        if (request("material_id")) {
            $query->where("material_id", "like", "%" . request("material_id") . "%");
        }
        if (request("transaction_by")) {
            $query->where("transaction_by", "like", "%" . request("transaction_by") . "%");
        }

        $transactionMaterials = TransactionMaterialResource::collection($query->orderBy($sortField, $sortDirection)->orderBy('updated_at', 'desc')->paginate(15)->onEachSide(1));

        return Inertia::render('TransactionMaterial/Index', [
            'transactionMaterials' => $transactionMaterials,
            'materials' => Material::all(),
            'queryParams' => request()->query() ?: null,
            'filters' => [
                'date' => $transactionMaterialAll->all()->pluck('date', 'date')->map(fn($v) => now()->parse($v)->format('d-F-Y')),
                'type' => $transactionMaterialAll->all()->pluck('type', 'type')->map(fn($v) => ucfirst(str_replace('_', ' ', $v))),
                'material_id' => $transactionMaterialAll->all()->pluck('material_id', 'material_id')->map(fn($v) => $transactionMaterialAll->where('material_id', $v)->first()->material->name),
                'transaction_by' => $transactionMaterialAll->all()->pluck('transaction_by', 'transaction_by')->map(fn($v) => $transactionMaterialAll->where('transaction_by', $v)->first()->transactionBy->full_name),
            ]
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
            'materials' => 'required|array',
            'transaction_by' => 'required|integer',
        ]);

        foreach ($request->materials as $material) {
            $transactionMaterial = TransactionMaterial::where('material_id', $material['material_id'])->latest()->first();
            if ($transactionMaterial == null) {
                $stock = StockMaterial::create(['qty' => floatval($material['qty'])]);
                $data = [
                    'date' => $request->date,
                    'type' => $request->type,
                    'material_id' => intval($material["material_id"]),
                    'qty' => floatval($material["qty"]),
                    'last_stock_id' => $stock->id,
                    'transaction_by' => $request->transaction_by,
                ];
            } else {
                switch ($request->type) {
                    case 'taking':
                        $stock = StockMaterial::create(['qty' => ($transactionMaterial->lastStock->qty - floatval($material['qty']))]);
                        break;

                    case 'comming':
                        $stock = StockMaterial::create(['qty' => ($transactionMaterial->lastStock->qty + floatval($material['qty']))]);
                        break;

                    default:
                        $stock = StockMaterial::create(['qty' => floatval($material['qty'])]);
                        break;
                }
                $data = [
                    'date' => $request->date,
                    'type' => $request->type,
                    'material_id' => intval($material["material_id"]),
                    'qty' => floatval($material["qty"]),
                    'first_stock_id' => $transactionMaterial->lastStock->id,
                    'last_stock_id' => $stock->id,
                    'transaction_by' => $request->transaction_by,
                ];
            }
            TransactionMaterial::create($data);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|date',
            'type' => 'required|string',
            'materials' => 'required|array',
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