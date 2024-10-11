<?php

namespace App\Jobs;

use App\Models\PoItem;
use App\Models\User;
use App\Notifications\ImportNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ImportPoItemJob implements ShouldQueue
{
    use Queueable;
    public $receipent, $files;

    /**
     * Create a new job instance.
     */
    public function __construct(User $receipent, array $files)
    {
        $this->receipent = $receipent;
        $this->files = $files;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        PoItem::truncate();
        foreach ($this->files as $key => $value) {
            try {
                $file = storage_path('app/public/imports/' . $value);
                $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
                $reader->setReadDataOnly(true);
                $spreadsheet = $reader->load($file);
                foreach ($spreadsheet->getSheetNames() as $sheetName) {
                    foreach ($spreadsheet->getSheetByName($sheetName)->toArray() as $numRow => $row) {
                        $line = $sheetName;
                        $poItem = intval($row[11] ?? 0);
                        $spkPublish = intval($row[7]) > 0 ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[7])->format('Y-m-d') : null;
                        $special = strtolower($row[10]) === 'slt' || strtolower($row[10]) === 'promo' ? $row[10] : null;
                        $release = intval($row[9]) > 0 ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[9])->format('Y-m-d') : null;
                        $styleNumber = $row[12] ?? null;
                        $modelName = $row[13] ?? null;
                        $qty = floatval($row[34] ?? 0);
                        $remark = $row[4] ?? null;

                        if (!empty($poItem) && $poItem > 0) {
                            $data = [
                                'line' => trim($line),
                                'spk_publish' => $spkPublish,
                                'release' => $release,
                                'po_number' => $poItem,
                                'style_number' => trim($styleNumber),
                                'model_name' => trim($modelName),
                                'qty' => $qty,
                                'special' => trim($special),
                                'remark' => trim($remark)
                            ];
                            PoItem::create($data);
                        }
                    }
                }
                $this->receipent->notify(new ImportNotification(title: 'Imported success', message: $this->files[$key] . ' imported successfully'));
            } catch (\Exception $e) {
                $this->receipent->notify(new ImportNotification(title: 'Import error', message: $this->files[$key] . ' import error : ' . $e->getMessage(), notif: 'error'));
            }
        }
    }
}