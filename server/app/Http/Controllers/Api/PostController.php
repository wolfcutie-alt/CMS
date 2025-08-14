<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/posts",
     *     summary="Get a list of posts",
     *     tags={"Posts"},
     *     @OA\Response(response=200, description="Successful operation"),
     *     @OA\Response(response=400, description="Invalid request")
     * )
     */
    public function index()
    {
        return response()->json(Post::all());
    }

    /**
     * @OA\Post(
     *     path="/api/posts",
     *     summary="Create a post",
     *     tags={"Posts"},
     *     @OA\Response(response=200, description="Successful operation"),
     *     @OA\Response(response=400, description="Invalid request")
     * )
     */
    public function store(Request $request)
    {
        $post = Post::create($request->all());
    }

    /**
     * @OA\Get(
     *     path="/api/posts/:id",
     *     summary="Get a post",
     *     tags={"Posts"},
     *     @OA\Response(response=200, description="Successful operation"),
     *     @OA\Response(response=400, description="Invalid request")
     * )
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
    }

    /**
     * @OA\Put(
     *     path="/api/posts/:id",
     *     summary="Update a post",
     *     tags={"Posts"},
     *     @OA\Response(response=200, description="Successful operation"),
     *     @OA\Response(response=400, description="Invalid request")
     * )
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->update($request->all());
    }

    /**
     * @OA\Delete(
     *     path="/api/posts/:id",
     *     summary="Delete a post",
     *     tags={"Posts"},
     *     @OA\Response(response=200, description="Successful operation"),
     *     @OA\Response(response=400, description="Invalid request")
     * )
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
    }

}
