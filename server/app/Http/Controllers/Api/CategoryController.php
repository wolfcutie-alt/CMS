<?php 

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *      path="/category",
     *      operationId="getCategoriesList",
     *      tags={"Category"},
     *      summary="Get list of categories",
     *      description="Returns list of categories",
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
     * Returns list of categories
     */
    public function index()
    {
        $categories = Category::withCount('posts')->orderBy("created_at","desc")->get();
        return response()->json(['data' => $categories]);
    }

    /**
     * @OA\Post(
     *      path="/category",
     *      operationId="createACategory",
     *      tags={"Category"},
     *      summary="Create a category",
     *      description="Create a category",
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
     * Create a category
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'slug' => 'required|string|max:100|unique:categories,slug',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:7|regex:/^#[0-9A-F]{6}$/i',
        ]);

        $category = Category::create($validated);
        return response()->json($category, 201);
    }

    /**
     * @OA\Get(
     *     path="/category/:id",
     *     operationId="getACategory",
     *     summary="Get a category",
     *     tags={"Category"},
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
     * Return a category
     */
    public function show($id)
    {
        $category = Category::withCount('posts')->findOrFail($id);
        return response()->json($category);
    }

    /**
     * @OA\Put(
     *     path="/category/:id",
     *     operationId="updateACategory",
     *     summary="Update a category",
     *     tags={"Category"},
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
     * Update a category 
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'slug' => ['required', 'string', 'max:100', Rule::unique('categories', 'slug')->ignore($id)],
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:7|regex:/^#[0-9A-F]{6}$/i',
        ]);

        $category->update($validated);
        return response()->json($category, 200);
    }

    /**
     * @OA\Delete(
     *     path="/category/:id",
     *     operationId="deleteACategory",
     *     summary="Delete a category",
     *     tags={"Category"},
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
     * Delete a category
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        
        // Check if category has posts
        if ($category->posts()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete category that has posts. Please move or delete the posts first.'
            ], 422);
        }
        
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully'], 204);
    }
}