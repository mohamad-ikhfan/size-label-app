<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SchedulePrint extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function statusUpdatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'status_updated_by');
    }

    public function modelForMaterial(): BelongsTo
    {
        return $this->belongsTo(ModelForMaterial::class, 'model_for_material_id');
    }
}