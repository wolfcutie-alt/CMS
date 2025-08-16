<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    /**
     * @OA\Get(
     *      path="/media",
     *      operationId="getMediasList",
     *      tags={"Media"},
     *      summary="Get list of medias",
     *      description="Returns list of medias",
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
     * Returns list of medias
     */
    public function index()
    {
        $media = Media::orderBy("id","desc")->paginate(10);
        return response()->json($media);
    }

    /**
     * @OA\Post(
     *      path="/media",
     *      operationId="createAMedia",
     *      tags={"Media"},
     *      summary="Create a media",
     *      description="Create a media",
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
     * Create a media
     */
    public function store(Request $request)
    {
        $media = Media::create($request->all());
        return response()->json($media);
    }

    /**
     * @OA\Get(
     *     path="/media/:id",
     *     operationId="getAMedia",
     *     summary="Get a media",
     *     tags={"Media"},
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
     * Return a media
     */
    public function show(Media $media)
    {
        return response()->json($media);
    }

    /**
     * @OA\Put(
     *     path="/media/:id",
     *     operationId="updateAMedia",
     *     summary="Update a media",
     *     tags={"Media"},
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
     * Update a media
     */
    public function update(Request $request, Media $media)
    {
        $media->update($request->all());
        return response()->json($media);
    }

    /**
     * @OA\Delete(
     *     path="/media/:id",
     *     operationId="deleteAMedia",
     *     summary="Delete a media",
     *     tags={"Media"},
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
     * Delete a media
     */
    public function destroy(Media $media)
    {
        $media->delete();
        return response()->json(null,204);
    }
}
