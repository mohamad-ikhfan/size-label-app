<?php

namespace App\Jobs;

use App\Models\ReportPrint;
use App\Models\User;
use App\Notifications\ImportNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ImportReportPrintJob implements ShouldQueue
{
    use Queueable;

    public $receipent, $file;

    /**
     * Create a new job instance.
     */
    public function __construct(User $receipent, $file)
    {
        $this->receipent = $receipent;
        $this->file = $file;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            ReportPrint::truncate();
            $file = storage_path('app/public/imports/' . $this->file);
            $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
            $reader->setReadDataOnly(true);
            $spreadsheet = $reader->load($file);
            foreach ($spreadsheet->getSheetNames() as $sheetName) {
                foreach ($spreadsheet->getSheetByName($sheetName)->toArray() as $numRow => $row) {
                    $printedAt = intval($row[0]) > 0 ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[0])->format('Y-m-d') : null;
                    $line = intval($row[1] ?? 0);
                    $poItem = intval($row[2] ?? 0);
                    $release = intval($row[3]) > 0 ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[3])->format('Y-m-d') : null;
                    $styleNumber = $row[4] ?? null;
                    $modelName = $row[5] ?? null;
                    $special = $row[6] ?? null;
                    $qty = floatval($row[8] ?? 0);
                    $remark = $row[9] ?? null;
                    $printedBy = intval($row[10] ?? 0);

                    if (!empty($poItem) && $poItem > 0) {
                        $data = [
                            'printed_at' => $printedAt,
                            'line' => $line,
                            'release' => $release,
                            'po_number' => $poItem,
                            'style_number' => $styleNumber,
                            'model_name' => $modelName,
                            'qty' => $qty,
                            'special' => $special,
                            'remark' => $remark,
                            'printed_by' => $printedBy,
                        ];
                        ReportPrint::create($data);
                    }
                }
            }
            $this->receipent->notify(new ImportNotification(title: 'Imported success', message: $this->file . ' imported successfully'));
        } catch (\Exception $e) {
            $this->receipent->notify(new ImportNotification(title: 'Import error', message: $this->file . ' import error : ' . $e->getMessage(), notif: 'error'));
        }
    }
}
