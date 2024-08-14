<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportPrintResource extends JsonResource
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
            'printed_at' => $this->printed_at,
            'printed_at_format' => Carbon::parse($this->printed_at)->format('d-F-Y'),
            'line' => $this->line,
            'po_number' => $this->po_number,
            'release' => $this->release,
            'release_format' => Carbon::parse($this->release)->format('m/d y'),
            'style_number' => $this->style_number,
            'model_name' => $this->model_name,
            'special' => $this->special,
            'qty' => $this->qty,
            'remark' => $this->remark,
            'printed_by' => $this->printed_by,
            'printed_by_name' => $this->printedBy->name ?? null,
        ];
    }
}