<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Auth::user()->notifications;
        response()->json($notifications);
    }

    public function read($id)
    {
        $notification = Auth::user()->notifications->find($id);
        $notification->update(['read_at' => now()]);
    }

    public function destroy($id)
    {
        $notification = Auth::user()->notifications->find($id);
        $notification->delete();
    }
}