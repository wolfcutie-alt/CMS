<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
        /**
     * @OA\Get(
     *      path="/user",
     *      operationId="getUsersList",
     *      tags={"User"},
     *      summary="Get list of users",
     *      description="Returns list of users",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation"
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *       security={
     *           {"api_key_security_example": {}}
     *       }
     *     )
     *
     * Returns list of users
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);
        $users = User::query()
            ->orderByDesc('id')
            ->paginate($perPage);

        return response()->json($users);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * @OA\Post(
     *      path="/user",
     *      operationId="createAnUser",
     *      tags={"User"},
     *      summary="Create a user",
     *      description="Create a user",
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation"
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *       security={
     *           {"api_key_security_example": {}}
     *       }
     *     )
     *
     * Create a user
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['sometimes', 'in:admin,editor,author'],
            'status' => ['sometimes', 'in:active,inactive,pending'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'author',
            'status' => $validated['status'] ?? 'pending',
        ]);

        return response()->json($user, 201);
    }

    /**
     * @OA\Put(
     *     path="/user/:id",
     *     operationId="updateAnUser",
     *     summary="Update an user",
     *     tags={"User"},
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation"
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *       security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     * 
     * Update an user
     */

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['sometimes', 'string', 'min:8'],
            'role' => ['sometimes', 'in:admin,editor,author'],
            'status' => ['sometimes', 'in:active,inactive,pending'],
        ]);

        if (array_key_exists('name', $validated)) {
            $user->name = $validated['name'];
        }
        if (array_key_exists('email', $validated)) {
            $user->email = $validated['email'];
        }
        if (array_key_exists('password', $validated)) {
            $user->password = Hash::make($validated['password']);
        }
        if (array_key_exists('role', $validated)) {
            $user->role = $validated['role'];
        }
        if (array_key_exists('status', $validated)) {
            $user->status = $validated['status'];
        }
        $user->save();

        return response()->json($user);
    }

    /**
     * @OA\Delete(
     *     path="/user/:id",
     *     operationId="deleteAnUser",
     *     summary="Delete an user",
     *     tags={"User"},
     *      @OA\Response(
     *          response=204,
     *          description="Successful operation"
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *       security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     * 
     * Delete an user
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([ 'message' => 'Deleted' ]);
    }
}


