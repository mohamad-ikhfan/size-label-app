<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionMaterial extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function material(): BelongsTo
    {
        return $this->belongsTo(Material::class);
    }

    public function firstStock(): BelongsTo
    {
        return $this->belongsTo(StockMaterial::class, 'first_stock_id');
    }

    public function lastStock(): BelongsTo
    {
        return $this->belongsTo(StockMaterial::class, 'last_stock_id');
    }

    public function transactionBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'transaction_by');
    }
}