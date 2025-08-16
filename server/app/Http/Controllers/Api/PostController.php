<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * @OA\Get(
     *      path="/post",
     *      operationId="getPostsList",
     *      tags={"Post"},
     *      summary="Get list of posts",
     *      description="Returns list of posts",
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
     * Returns list of posts
     */
    public function index()
    {
        return response()->json(Post::all(), 200);
    }

    /**
     * @OA\Post(
     *      path="/post",
     *      operationId="createAPost",
     *      tags={"Post"},
     *      summary="Create a post",
     *      description="Create a post",
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
     * Create a post
     */
    public function store(Request $request)
    {
        $post = Post::create($request->all());
        return response()->json($post, 201);
    }

    /**
     * @OA\Get(
     *     path="/post/:id",
     *     operationId="getAPost",
     *     summary="Get a post",
     *     tags={"Post"},
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
     * Return a post
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post, 200);
    }

    /**
     * @OA\Put(
     *     path="/post/:id",
     *     operationId="updateAPost",
     *     summary="Update a post",
     *     tags={"Post"},
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
     * Update a post
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->update($request->all());
        return response()->json($post, 200);
    }

    /**
     * @OA\Delete(
     *     path="/post/:id",
     *     operationId="deleteAPost",
     *     summary="Delete a post",
     *     tags={"Post"},
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
     * Delete a post
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(null,204);
    }

}