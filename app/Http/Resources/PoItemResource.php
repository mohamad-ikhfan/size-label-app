<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PoItemResource extends JsonResource
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
            'spk_publish' => $this->spk_publish,
            'spk_publish_format' => $this->spk_publish ? Carbon::parse($this->spk_publish)->format('m/d y') : null,
            'release' => $this->release,
            'release_format' => Carbon::parse($this->release)->format('m/d y'),
            'po_number' => $this->po_number,
            'style_number' => $this->style_number,
            'model_name' => $this->model_name,
            'qty' => $this->qty,
            'special' => $this->special,
            'remark' => $this->remark,
            'created_at' => Carbon::parse($this->created_at)->format('d-M-Y'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d-M-Y'),
        ];
    }
}