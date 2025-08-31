<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
// use Intervention\Image\Facades\Image; // Uncomment after installing intervention/image package

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
        try {
            $media = Media::orderBy("id", "desc")->get();
            return response()->json($media);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch media'], 500);
        }
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
        try {
            $validator = Validator::make($request->all(), [
                'file' => 'required|file|max:10240', // 10MB max
                'name' => 'required|string|max:255',
                'type' => 'required|string|in:image,video,audio,document,archive',
                'alt' => 'nullable|string|max:255',
                'caption' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            $mimeType = $file->getMimeType();
            $size = $file->getSize();
            
            // Generate unique filename
            $extension = $file->getClientOriginalExtension();
            $filename = Str::random(40) . '.' . $extension;
            
            // Store file
            $path = $file->storeAs('media', $filename, 'public');
            $url = Storage::url($path);
            
            // Generate thumbnail for images (simple copy for now)
            $thumbnailUrl = null;
            if ($request->type === 'image') {
                try {
                    $thumbnailFilename = 'thumb_' . $filename;
                    $thumbnailPath = 'media/' . $thumbnailFilename;
                    
                    // For now, just copy the original file as thumbnail
                    // TODO: Install intervention/image package for proper thumbnail generation
                    Storage::disk('public')->copy($path, $thumbnailPath);
                    $thumbnailUrl = Storage::url($thumbnailPath);
                    
                    Log::info('Thumbnail created (copy)', [
                        'original' => $path,
                        'thumbnail' => $thumbnailPath,
                        'thumbnail_url' => $thumbnailUrl
                    ]);
                } catch (\Exception $e) {
                    Log::warning('Failed to create thumbnail', [
                        'error' => $e->getMessage(),
                        'file' => $path
                    ]);
                }
            }
            
            // Debug information
            Log::info('File upload debug', [
                'original_name' => $originalName,
                'stored_path' => $path,
                'generated_url' => $url,
                'thumbnail_url' => $thumbnailUrl,
                'file_exists' => Storage::disk('public')->exists($path),
                'full_path' => Storage::disk('public')->path($path)
            ]);
            
            // Create media record
            $media = Media::create([
                'name' => $request->name,
                'originalName' => $originalName,
                'type' => $request->type,
                'mimeType' => $mimeType,
                'size' => $size,
                'url' => $url,
                'thumbnailUrl' => $thumbnailUrl,
                'alt' => $request->alt,
                'caption' => $request->caption,
                'uploadedBy' => 1, // Default to user 1 for now
            ]);

            return response()->json($media, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to upload media: ' . $e->getMessage()], 500);
        }
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
        try {
            return response()->json($media);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch media'], 500);
        }
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
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'type' => 'sometimes|required|string|in:image,video,audio,document,archive',
                'alt' => 'nullable|string|max:255',
                'caption' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $media->update($request->only(['name', 'type', 'alt', 'caption']));
            
            return response()->json($media);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update media: ' . $e->getMessage()], 500);
        }
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
        try {
            // Delete original file from storage
            $path = str_replace('/storage/', '', $media->url);
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                Log::info('Original file deleted', ['path' => $path]);
            }
            
            // Delete thumbnail file if it exists
            if ($media->thumbnailUrl) {
                $thumbnailPath = str_replace('/storage/', '', $media->thumbnailUrl);
                if (Storage::disk('public')->exists($thumbnailPath)) {
                    Storage::disk('public')->delete($thumbnailPath);
                    Log::info('Thumbnail file deleted', ['path' => $thumbnailPath]);
                }
            }
            
            // Delete database record
            $media->delete();
            Log::info('Media record deleted from database', ['id' => $media->id]);
            
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Failed to delete media', [
                'id' => $media->id,
                'error' => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to delete media: ' . $e->getMessage()], 500);
        }
    }
}
