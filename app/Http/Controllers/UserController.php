<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("full_name")) {
            $query->where("full_name", "like", "%" . request("full_name") . "%");
        }
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }
        if (request("blocked")) {
            request("blocked") == "true" ? $query->whereNull('blocked') : $query->whereNotNull('blocked');
        }

        /**@disregard P1013*/
        $users = UserResource::collection($query->orderBy($sortField, $sortDirection)->paginate(15)->onEachSide(1));
        return Inertia::render('Users/Index', [
            'users' => $users,
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string',
            'name' => 'required|string|unique:users',
            'email' => 'nullable|email|unique:users',
            'password' => 'required|string'
        ]);

        User::create([
            'full_name' => $request->full_name,
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'full_name' => 'required|string',
            'name' => 'required|string|unique:users,name,' . $id,
            'email' => 'nullable|email|unique:users,email,' . $id
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'full_name' => $request->full_name,
            'name' => $request->name,
            'email' => $request->email,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }
}