<?php

namespace App\Http\Controllers;

use App\Http\Resources\HistoryImportResource;
use App\Models\HistoryImportFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryImportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('HistoryImports/Index', [
            'historyImports' => HistoryImportResource::collection(HistoryImportFile::latest()->get())
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $historyImport = HistoryImportFile::findOrFail($id);
        unlink(storage_path($historyImport->path . '/' . $historyImport->name . '.' . $historyImport->extension));
        $historyImport->delete();
    }

    public function download($id)
    {
        $historyImport = HistoryImportFile::findOrFail($id);
        $file = storage_path($historyImport->path . '/' . $historyImport->name . '.' . $historyImport->extension);
        return response()->download($file);
    }
}