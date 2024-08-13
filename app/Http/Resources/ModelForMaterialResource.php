<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ModelForMaterialResource extends JsonResource
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
            'model_name' => $this->model_name,
            'gender' => $this->gender,
            'category' => $this->category,
            'material_type' => $this->material_type,
            'material_size' => $this->material_size,
            'wide' => $this->wide,
            'created_at' => Carbon::parse($this->created_at)->format('d-M-Y'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d-M-Y'),
        ];
    }
}