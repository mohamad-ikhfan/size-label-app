<?php

namespace App\Http\Controllers;

use App\Http\Resources\DestroyRibbonResource;
use App\Models\DestroyRibbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class DestroyRibbonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $destroyRibbonAll = new DestroyRibbon();
        $query = DestroyRibbon::query();

        $sortField = request("sort_field", "destroyed_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("destroyed_at")) {
            $query->where("destroyed_at", "like", "%" . request("destroyed_at") . "%");
        }
        if (request("destroyed_by")) {
            $query->where("destroyed_by", "like", "%" . request("destroyed_by") . "%");
        }

        /**@disregard P1013*/
        $destroyRibbons = DestroyRibbonResource::collection($query->orderBy($sortField, $sortDirection)->orderBy('updated_at', 'desc')->paginate(15)->onEachSide(1));
        return Inertia::render('DistroyRibbons/Index', [
            'destroyRibbons' => $destroyRibbons,
            'queryParams' => request()->query() ?: null,
            'filters' => [
                'destroyed_at' => $destroyRibbonAll->all()->pluck('destroyed_at', 'destroyed_at')->map(fn($v) => now()->parse($v)->format('d-F-Y')),
                'destroyed_by' => $destroyRibbonAll->all()->pluck('destroyed_by', 'destroyed_by')->map(fn($v) => $destroyRibbonAll->where('destroyed_by', $v)->first()->destroyedBy->full_name),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'destroyed_at' => 'required|date',
            'destroyed_by' => 'required|integer',
            'qty' => 'required|integer|min:1'
        ]);

        DestroyRibbon::create([
            'destroyed_at' => $request->destroyed_at,
            'destroyed_by' => $request->destroyed_by,
            'qty' => $request->qty,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'destroyed_at' => 'required|date',
            'qty' => 'required|integer|min:1'
        ]);

        $destroyRibbon = DestroyRibbon::findOrFail($id);
        $destroyRibbon->update([
            'destroyed_at' => $request->destroyed_at,
            'qty' => $request->qty,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $destroyRibbon = DestroyRibbon::findOrFail($id);
        $destroyRibbon->delete();
    }

    public function export(Request $request)
    {
        $request->validate([
            'from_date' => 'required|date',
            'to_date' => 'required|date',
        ]);

        $destroyRibbons = DestroyRibbon::where('destroyed_at', '>=', $request->from_date)
            ->where('destroyed_at', '<=', $request->to_date)
            ->orderBy('destroyed_at')
            ->get();

        $distroyCollection = collect();
        foreach ($destroyRibbons as $key => $value) {
            $distroyCollection->push([
                'num_row' => ($key + 3),
                'destroyed_at' => now()->parse($value->destroyed_at)->addDay()->format('Y-m-d'),
                'full_name' => $value->destroyedBy->full_name,
                'qty' => $value->qty,
            ]);
        }

        $spreadsheet = new Spreadsheet();
        $activeWorksheet = $spreadsheet->getActiveSheet();

        $style_header = [
            'font' => [
                'bold' => true,
                'size' => 14
            ],
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER
            ]
        ];

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

        $activeWorksheet->setCellValue('A1', 'LOG BOOK DESTROY RIBBON');
        $activeWorksheet->mergeCells("A1:D1");
        $activeWorksheet->getStyle("A1:D1")->applyFromArray($style_header);

        $activeWorksheet->setCellValue('A2', 'DATE');
        $activeWorksheet->getStyle("A2")->applyFromArray($style_title);
        $activeWorksheet->setCellValue('B2', 'PIC');
        $activeWorksheet->getStyle("B2")->applyFromArray($style_title);
        $activeWorksheet->setCellValue('C2', 'QTY DESTROY');
        $activeWorksheet->getStyle("C2")->applyFromArray($style_title);
        $activeWorksheet->setCellValue('D2', 'UNIT');
        $activeWorksheet->getStyle("D2")->applyFromArray($style_title);

        $activeWorksheet->getRowDimension("1")->setRowHeight(30);
        $activeWorksheet->getRowDimension("2")->setRowHeight(20);

        foreach ($distroyCollection as $destroyRibbon) {
            $activeWorksheet->setCellValue('A' . $destroyRibbon['num_row'], isset($destroyRibbon['destroyed_at']) ? \PhpOffice\PhpSpreadsheet\Shared\Date::PHPToExcel(strtotime($destroyRibbon['destroyed_at'])) : null);
            $activeWorksheet->getStyle('A' . $destroyRibbon['num_row'])->getNumberFormat()->setFormatCode("dd-mmmm-yyyy");
            $activeWorksheet->setCellValue('B' . $destroyRibbon['num_row'], $destroyRibbon['full_name'] ?? null);
            $activeWorksheet->setCellValue('C' . $destroyRibbon['num_row'], $destroyRibbon['qty'] ?? null);
            $activeWorksheet->getStyle('C' . $destroyRibbon['num_row'])->getNumberFormat()->setFormatCode(0);
            $activeWorksheet->setCellValue('D' . $destroyRibbon['num_row'], 'ROLL');

            $activeWorksheet->getStyle('A' . $destroyRibbon['num_row'])->applyFromArray($style_data);
            $activeWorksheet->getStyle('B' . $destroyRibbon['num_row'])->applyFromArray($style_data);
            $activeWorksheet->getStyle('C' . $destroyRibbon['num_row'])->applyFromArray($style_data);
            $activeWorksheet->getStyle('D' . $destroyRibbon['num_row'])->applyFromArray($style_data);
        }

        $activeWorksheet->getColumnDimension("A")->setAutoSize(true);
        $activeWorksheet->getColumnDimension("B")->setAutoSize(true);
        $activeWorksheet->getColumnDimension("C")->setAutoSize(true);
        $activeWorksheet->getColumnDimension("D")->setAutoSize(true);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="export_destroy_ribbon.xlsx"');
        header('Cache-Control: max-age=0');

        $writer = new Xlsx($spreadsheet);
        $writer->save(storage_path('app/public/exports/export_destroy_ribbon.xlsx'));
    }

    public function download()
    {
        return response()->download(storage_path('app/public/exports/export_destroy_ribbon.xlsx'))->deleteFileAfterSend();
    }
}