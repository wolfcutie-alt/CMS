<?php 

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/category",
     *     summary="Get a list of categories",
     *     tags={"Category"},
     *     @OA\Response(response=200, description="Successful operation"),
     *     @OA\Response(response=400, description="Invalid request")
     * )
     */
    public function index()
    {
        $categories = Category::orderBy("created_at","desc")->paginate(10);
    }

    public function store(Request $request)
    {
        $category = Category::create($request->all());
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
    }
}