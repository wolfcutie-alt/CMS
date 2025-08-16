<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PostSeo;
use Illuminate\Http\Request;

class PostSeoController extends Controller
{
    /**
     * @OA\Get(
     *      path="/postseo",
     *      operationId="getPostSeosList",
     *      tags={"PostSeo"},
     *      summary="Get list of posts seo",
     *      description="Returns list of posts seo",
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
     * Returns list of posts seo
     */
    public function index()
    {
        $posts = PostSeo::orderBy("created_at","desc")->paginate(10);
        return response()->json($posts);
    }

    /**
     * @OA\Post(
     *      path="/postseo",
     *      operationId="createAPostSeo",
     *      tags={"PostSeo"},
     *      summary="Create a post seo",
     *      description="Create a post seo",
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
     * Create a post seo
     */
    public function store(Request $request)
    {
        $post = PostSeo::create($request->all());
        return response()->json($post);
    }

    /**
     * @OA\Get(
     *     path="/postseo/:id",
     *     operationId="getAPostSeo",
     *     summary="Get a post seo",
     *     tags={"PostSeo"},
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
     * Return a post seo
     */
    public function show(PostSeo $postSeo)
    {
        return response()->json($postSeo);
    }

    /**
     * @OA\Put(
     *     path="/postseo/:id",
     *     operationId="updateAPostSeo",
     *     summary="Update a post seo",
     *     tags={"PostSeo"},
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
     * Update a post seo
     */
    public function update(Request $request, PostSeo $postSeo)
    {
        $postSeo->update($request->all());
        return response()->json($postSeo);
    }

    /**
     * @OA\Delete(
     *     path="/postseo/:id",
     *     operationId="deleteAPostSeo",
     *     summary="Delete a post seo",
     *     tags={"PostSeo"},
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
     * Delete a post seo
     */
    public function destroy(PostSeo $postSeo)
    {
        $postSeo->delete();
        return response()->json([],200);
    }
}
