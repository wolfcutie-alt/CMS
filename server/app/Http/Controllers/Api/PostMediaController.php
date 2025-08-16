<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PostMedia;
use Illuminate\Http\Request;

class PostMediaController extends Controller
{
    /**
     * @OA\Get(
     *      path="/postmedia",
     *      operationId="getPostMediasList",
     *      tags={"PostMedia"},
     *      summary="Get list of post medias",
     *      description="Returns list of post medias",
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
        $posts = PostMedia::orderBy("created_at","desc")->paginate(10);
        return response()->json($posts);
    }

    /**
     * @OA\Post(
     *      path="/postmedia",
     *      operationId="createAPostMedia",
     *      tags={"PostMedia"},
     *      summary="Create a post media",
     *      description="Create a post media",
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
     * Create a post media
     */
    public function store(Request $request)
    {
        $post = PostMedia::create($request->all());
        return response()->json($post);
    }

    /**
     * @OA\Get(
     *     path="/postmedia/:id",
     *     operationId="getAPostMedia",
     *     summary="Get a post media",
     *     tags={"PostMedia"},
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
     * Return a post media
     */
    public function show(PostMedia $postMedia)
    {
        return response()->json($postMedia);
    }

    /**
     * @OA\Put(
     *     path="/postmedia/:id",
     *     operationId="updateAPostMedia",
     *     summary="Update a post media",
     *     tags={"PostMedia"},
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
     * Update a post media
     */
    public function update(Request $request, PostMedia $postMedia)
    {
        $postMedia->update($request->all());
        return response()->json($postMedia);
    }

    /**
     * @OA\Delete(
     *     path="/postmedia/:id",
     *     operationId="deleteAPostMedia",
     *     summary="Delete a post media",
     *     tags={"PostMedia"},
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
     * Delete a post media
     */
    public function destroy(PostMedia $postMedia)
    {
        $postMedia->delete();
        return response()->json($postMedia);
    }
}
