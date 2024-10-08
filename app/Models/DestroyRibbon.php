<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DestroyRibbon extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function destroyedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'destroyed_by');
    }
}
