<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DestroyRibbonResource extends JsonResource
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
            'destroyed_at' => $this->destroyed_at,
            'destroyed_date' => Carbon::parse($this->destroyed_at)->format('d-F-Y'),
            'destroyed_by' => $this->destroyed_by,
            'destroyed_by_name' => $this->destroyedBy->name,
            'qty' => $this->qty,
            'created_at' => Carbon::parse($this->created_at)->format('d-M-Y'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d-M-Y'),
        ];
    }
}
