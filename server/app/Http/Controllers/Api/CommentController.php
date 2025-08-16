<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * @OA\Get(
     *      path="/comment",
     *      operationId="getCommentsList",
     *      tags={"Comment"},
     *      summary="Get list of comments",
     *      description="Returns list of comments",
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
     * Returns list of comments
     */
    public function index()
    {
        $comments = Comment::latest()->paginate(10);
        return response()->json($comments);
    }

    /**
     * @OA\Post(
     *      path="/comment",
     *      operationId="createAComment",
     *      tags={"Comment"},
     *      summary="Create a comment",
     *      description="Create a comment",
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
     * Create a comment
     */
    public function store(Request $request)
    {
        $comment = new Comment();
        $comment->fill($request->all());
        $comment->save();
        return response()->json([
            "message"=> "",
            ""=> $comment
        ]);
    }

    /**
     * @OA\Get(
     *     path="/comment/:id",
     *     operationId="getAComment",
     *     summary="Get a comment",
     *     tags={"Comment"},
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
     * Return a comment
     */
    public function show(Comment $comment)
    {
        return response()->json($comment);
    }

    /**
     * @OA\Put(
     *     path="/comment/:id",
     *     operationId="updateAComment",
     *     summary="Update a comment",
     *     tags={"Comment"},
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
     * Update a comment
     */
    public function update(Request $request, Comment $comment)
    {
        $comment->fill($request->all());
        $comment->save();
        return response()->json([
            "message"=> "",
            ""=> $comment
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/comment/:id",
     *     operationId="deleteAComment",
     *     summary="Delete a comment",
     *     tags={"Comment"},
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
     * Delete a comment
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json([
            "message"=> ""
        ], 204);
    }
}
