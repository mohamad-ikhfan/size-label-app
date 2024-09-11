<?php

namespace App\Http\Controllers;

use App\Http\Resources\PoItemResource;
use App\Jobs\ImportPoItemJob;
use App\Models\HistoryImportFile;
use App\Models\PoItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            'line' => 'required|integer|min:1',
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
            'line' => 'required|integer|min:1',
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
}