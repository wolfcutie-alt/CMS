<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments = Comment::latest()->paginate(10);
        return response()->json($comments);
    }

    /**
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        return response()->json($comment);
    }

    /**
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json([
            "message"=> ""
        ], 204);
    }
}
