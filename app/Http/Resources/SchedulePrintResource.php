<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SchedulePrintResource extends JsonResource
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
            'line' => $this->line,
            'schedule' => $this->schedule,
            'schedule_format' => $this->schedule ? Carbon::parse($this->schedule)->format('d-F-y') : null,
            'release' => $this->release,
            'release_format' => Carbon::parse($this->release)->format('m/d y'),
            'style_number' => $this->style_number,
            'model_name' => $this->model_name,
            'qty' => $this->qty,
            'model_for_material_id' => $this->model_for_material_id,
            'model_for_material_type' => $this->modelForMaterial->material_type ?? null,
            'model_for_material_size' => $this->modelForMaterial->material_size ?? null,
            'status_updated_by' => $this->status_updated_by,
            'status_updated_by_name' => $this->statusUpdatedBy->full_name ?? null,
            'status' => $this->status,
            'status_text' => ucfirst($this->status),
            'status_updated_at' => $this->status_updated_at,
            'status_updated_at_format' => Carbon::parse($this->status_updated_at)->format('d/M/y'),
        ];
    }
}