<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReportPrintResource;
use App\Jobs\ImportReportPrintJob;
use App\Models\HistoryImportFile;
use App\Models\ReportPrint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportPrintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ReportPrints/Index', [
            'reportPrints' => ReportPrintResource::collection(ReportPrint::orderBy('printed_at', 'desc')->orderBy('printed_by')->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'printed_at' => 'required|date',
            'line' => 'required|integer',
            'po_number' => 'required|numeric',
            'release' => 'required|date',
            'style_number' => 'required|string',
            'model_name' => 'required|string',
            'special' => 'nullable|string',
            'qty' => 'required|numeric|min:1',
            'remark' => 'nullable|string',
            'printed_by' => 'required|integer',
        ]);

        ReportPrint::create([
            'printed_at' => $request->printed_at,
            'line' => $request->line,
            'po_number' => $request->po_number,
            'release' => $request->release,
            'style_number' => strtoupper($request->style_number),
            'model_name' => strtoupper($request->model_name),
            'special' => $request->special,
            'qty' => $request->qty,
            'remark' => $request->remark,
            'printed_by' => $request->printed_by,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'printed_at' => 'required|date',
            'line' => 'required|integer',
            'po_number' => 'required|numeric',
            'release' => 'required|date',
            'style_number' => 'required|string',
            'model_name' => 'required|string',
            'special' => 'nullable|string',
            'qty' => 'required|numeric|min:1',
            'remark' => 'nullable|string',
            'printed_by' => 'required|integer',
        ]);

        $reportPrint = ReportPrint::findOrFail($id);
        $reportPrint->update([
            'printed_at' => $request->printed_at,
            'line' => $request->line,
            'po_number' => $request->po_number,
            'release' => $request->release,
            'style_number' => strtoupper($request->style_number),
            'model_name' => strtoupper($request->model_name),
            'special' => $request->special,
            'qty' => $request->qty,
            'remark' => $request->remark,
            'printed_by' => $request->printed_by,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $reportPrint = ReportPrint::findOrFail($id);
        $reportPrint->delete();
    }

    public function import(Request $request)
    {
        $request->validate(([
            'import_file' => 'required|file'
        ]));

        $dateFormat = '_(' . now()->format('d-m-y') . '_' . time() . ')';
        $file = $request->file('import_file');
        $ext = $file->getClientOriginalExtension();
        $fileName = str_replace("." . $ext, "", $file->getClientOriginalName()) . $dateFormat;
        $mimeType = $file->getMimeType();
        $size = $file->getSize();
        $path = 'app/public/imports';

        $file->move(storage_path($path), $fileName . "." . $ext);

        ImportReportPrintJob::dispatch(auth()->guard('web')->user(), $fileName . "." . $ext);

        HistoryImportFile::create([
            'name' => $fileName,
            'extension' => $ext,
            'mime_type' => $mimeType,
            'size' => $size,
            'path' => $path,
        ]);
    }
}