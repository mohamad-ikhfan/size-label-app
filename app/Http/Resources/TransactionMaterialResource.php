<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionMaterialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'date_format' => Carbon::parse($this->date)->format('d-F-Y'),
            'type' => $this->type,
            'material_id' => $this->material_id,
            'material_name' => $this->material->name,
            'qty' => $this->qty,
            'first_stock_id' => $this->first_stock_id,
            'first_stock_qty' => $this->firstStock->qty ?? 0,
            'last_stock_id' => $this->last_stock_id,
            'last_stock_qty' => $this->lastStock->qty ?? 0,
            'transaction_by' => $this->transaction_by,
            'transaction_by_name' => $this->transactionBy->full_name,
            'created_at' => Carbon::parse($this->created_at)->format('d-M-Y'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d-M-Y'),
        ];
    }
}