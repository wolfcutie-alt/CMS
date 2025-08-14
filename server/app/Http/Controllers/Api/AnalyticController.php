<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Analytic;
use Illuminate\Http\Request;

class AnalyticController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/analytics",
     *     summary="Get a list of analytics",
     *     tags={"Analytics"},
     *     @OA\Response(response=200, description="Successful operation"),
     *     @OA\Response(response=400, description="Invalid request")
     * )
     */
    public function index()
    {
        $analytic = Analytic::all();
        return response()->json($analytic);
    }

    /**
     * @OA\Post(
     *     path="/api/analytics",
     *     summary="Create a analytic",
     *     tags={"Analytics"},
     *     @OA\Response(response=200, description="Successful operation"),
     *     @OA\Response(response=400, description="Invalid request")
     * )
     */
    public function store(Request $request)
    {
        $analytic = Analytic::create($request->all());
        return response()->json($analytic, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Analytic $analytic)
    {
        return response()->json($analytic);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Analytic $analytic)
    {
        $analytic->update($request->all());
        return response()->json($analytic);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Analytic $analytic)
    {
        $analytic->delete();
        return response()->json(null,204);
    }
}
