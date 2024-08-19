<?php

use App\Http\Controllers\DestroyRibbonController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ModelForMaterialController;
use App\Http\Controllers\PoItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportPrintController;
use App\Http\Controllers\SchedulePrintController;
use App\Http\Controllers\TransactionMaterialController;
use App\Http\Controllers\UserController;
use App\Models\User;
use App\Notifications\ImportNotification;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::redirect('/', 'dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('user', UserController::class)->except('create', 'show', 'edit');
    Route::resource('destroy-ribbon', DestroyRibbonController::class)->except('create', 'show', 'edit');
    Route::resource('model-for-material', ModelForMaterialController::class)->except('create', 'show', 'edit');
    Route::resource('po-item', PoItemController::class)->except('create', 'show', 'edit');
    Route::resource('report-print', ReportPrintController::class)->except('create', 'show', 'edit');
    Route::post('report-print/import-file', [ReportPrintController::class, 'import'])->name('report-print.import');
    Route::resource('schedule-print', SchedulePrintController::class)->except('create', 'show', 'edit');
    Route::resource('material', MaterialController::class)->except('create', 'show', 'edit');
    Route::resource('transaction-material', TransactionMaterialController::class)->except('create', 'show', 'edit');


    Route::get('/testing', function () {
        $user = User::find(auth()->guard('web')->user()->id);
        dd($user->notify(new ImportNotification('Laporan Print.xlsx')));
    });
});

require __DIR__ . '/auth.php';