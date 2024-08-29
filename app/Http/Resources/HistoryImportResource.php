<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoryImportResource extends JsonResource
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
            'name' => $this->name,
            'extension' => $this->extension,
            'mime_type' => $this->mime_type,
            'path' => $this->path,
            'size' => $this->formatBytes($this->size),
        ];
    }

    public static function formatBytes($size, $decimals = 0)
    {
        $unit = array(
            '0' => 'Byte',
            '1' => 'KB',
            '2' => 'MB',
            '3' => 'GB',
            '4' => 'TB',
            '5' => 'PB',
            '6' => 'EB',
            '7' => 'ZB',
            '8' => 'YB'
        );

        for ($i = 0; $size >= 1024 && $i <= count($unit); $i++) {
            $size = $size / 1024;
        }

        return round($size, $decimals) . ' ' . $unit[$i];
    }
}