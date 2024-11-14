<?php

namespace App\Http\Controllers;

use App\Http\Resources\PoItemResource;
use App\Jobs\ImportPoItemJob;
use App\Models\HistoryImportFile;
use App\Models\PoItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class PoItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('PoItems/Index', [
            'poItems' => PoItemResource::collection(PoItem::all())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'line' => 'required|string',
            'spk_publish' => 'nullable|date',
            'release' => 'required|date',
            'po_number' => 'required|numeric|unique:po_items',
            'style_number' => 'required|string',
            'model_name' => 'required|string',
            'qty' => 'required|numeric',
            'special' => 'nullable|string',
            'remark' => 'nullable|string',
        ]);

        PoItem::create([
            'line' => $request->line,
            'spk_publish' => $request->spk_publish,
            'release' => $request->release,
            'po_number' => $request->po_number,
            'style_number' => strtoupper($request->style_number),
            'model_name' => strtoupper($request->model_name),
            'qty' => $request->qty,
            'special' => $request->special,
            'remark' => $request->remark,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'line' => 'required|string',
            'spk_publish' => 'nullable|date',
            'release' => 'required|date',
            'po_number' => 'required|numeric|unique:po_items,po_number,' . $id,
            'style_number' => 'required|string',
            'model_name' => 'required|string',
            'qty' => 'required|numeric',
            'special' => 'nullable|string',
            'remark' => 'nullable|string',
        ]);

        $poItem = PoItem::findOrFail($id);
        $poItem->update([
            'line' => $request->line,
            'spk_publish' => $request->spk_publish,
            'release' => $request->release,
            'po_number' => $request->po_number,
            'style_number' => strtoupper($request->style_number),
            'model_name' => strtoupper($request->model_name),
            'qty' => $request->qty,
            'special' => $request->special,
            'remark' => $request->remark,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $poItem = PoItem::findOrFail($id);
        $poItem->delete();
    }

    public function import(Request $request)
    {
        $request->validate(([
            'import_file_f2' => 'required|file',
            'import_file_f4' => 'required|file',
            'import_file_f6' => 'required|file',
            'import_file_f7' => 'required|file',
        ]));

        $dateFormat = '_(' . now()->format('d-m-y') . '_' . time() . ')';
        $path = 'app/public/imports';

        $files = collect();

        foreach ($request->all() as $key => $value) {
            $file = $request->file($key);
            $ext = $file->getClientOriginalExtension();
            $fileName = str_replace("." . $ext, "", $file->getClientOriginalName()) . $dateFormat;
            $mimeType = $file->getMimeType();
            $size = $file->getSize();
            $file->move(storage_path($path), $fileName . "." . $ext);
            $files->push($fileName . "." . $ext);

            HistoryImportFile::create([
                'name' => $fileName,
                'extension' => $ext,
                'mime_type' => $mimeType,
                'size' => $size,
                'path' => $path,
            ]);
        }

        ImportPoItemJob::dispatch(auth()->guard('web')->user(), $files->toArray());
    }

    public function export()
    {
        $poItems = PoItem::all();

        $spreadsheet = new Spreadsheet();
        $activeWorksheet = $spreadsheet->getActiveSheet();

        $style_title = [
            'font' => ['bold' => true],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER
            ],

            'borders' => [
                'top' => ['borderStyle'  => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
                'right' => ['borderStyle'  => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
                'bottom' => ['borderStyle'  => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
                'left' => ['borderStyle'  => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN]
            ]
        ];

        $style_data = [
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER
            ],
            'borders' => [
                'top' => ['borderStyle'  => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
                'right' => ['borderStyle'  => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
                'bottom' => ['borderStyle'  => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
                'left' => ['borderStyle'  => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN]
            ]
        ];

        $activeWorksheet->setCellValue('A1', 'Line');
        $activeWorksheet->getStyle("A1")->applyFromArray($style_title);
        $activeWorksheet->setCellValue('B1', 'Release');
        $activeWorksheet->getStyle("B1")->applyFromArray($style_title);
        $activeWorksheet->setCellValue('C1', 'PO Item');
        $activeWorksheet->getStyle("C1")->applyFromArray($style_title);
        $activeWorksheet->setCellValue('D1', 'Style Number');
        $activeWorksheet->getStyle("D1")->applyFromArray($style_title);
        $activeWorksheet->setCellValue('E1', 'Model Name');
        $activeWorksheet->getStyle("E1")->applyFromArray($style_title);
        $activeWorksheet->setCellValue('F1', 'Qty');
        $activeWorksheet->getStyle("F1")->applyFromArray($style_title);

        $rowCount = 2;
        foreach ($poItems as $poItem) {
            $activeWorksheet->setCellValue('A' . $rowCount, $poItem->line);
            $activeWorksheet->setCellValue('B' . $rowCount, \PhpOffice\PhpSpreadsheet\Shared\Date::PHPToExcel(strtotime($poItem->release)));
            $activeWorksheet->getStyle('B' . $rowCount)->getNumberFormat()->setFormatCode("m/d");
            $activeWorksheet->setCellValue('C' . $rowCount, $poItem->po_number);
            $activeWorksheet->getStyle('C' . $rowCount)->getNumberFormat()->setFormatCode(0);
            $activeWorksheet->setCellValue('D' . $rowCount, $poItem->style_number);
            $activeWorksheet->setCellValue('E' . $rowCount, $poItem->model_name);
            $activeWorksheet->setCellValue('F' . $rowCount, $poItem->qty);
            $activeWorksheet->getStyle('F' . $rowCount)->getNumberFormat()->setFormatCode(0);

            $activeWorksheet->getStyle('A' .  $rowCount)->applyFromArray($style_data);
            $activeWorksheet->getStyle('B' .  $rowCount)->applyFromArray($style_data);
            $activeWorksheet->getStyle('C' .  $rowCount)->applyFromArray($style_data);
            $activeWorksheet->getStyle('D' .  $rowCount)->applyFromArray($style_data);
            $activeWorksheet->getStyle('E' .  $rowCount)->applyFromArray($style_data);
            $activeWorksheet->getStyle('F' .  $rowCount)->applyFromArray($style_data);
            $rowCount++;
        }

        $activeWorksheet->getColumnDimension("A")->setAutoSize(true);
        $activeWorksheet->getColumnDimension("B")->setAutoSize(true);
        $activeWorksheet->getColumnDimension("C")->setAutoSize(true);
        $activeWorksheet->getColumnDimension("D")->setAutoSize(true);
        $activeWorksheet->getColumnDimension("E")->setAutoSize(true);
        $activeWorksheet->getColumnDimension("F")->setAutoSize(true);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="export_po_items.xlsx"');
        header('Cache-Control: max-age=0');

        $writer = new Xlsx($spreadsheet);
        $writer->save(storage_path('app/public/exports/export_po_items.xlsx'));
    }

    public function download()
    {
        return response()->download(storage_path('app/public/exports/export_po_items.xlsx'))->deleteFileAfterSend();
    }
}