<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Analytic;
use Illuminate\Http\Request;

class AnalyticController extends Controller
{
    /**
     * @OA\Get(
     *      path="/analytic",
     *      operationId="getAnalyticsList",
     *      tags={"Analytic"},
     *      summary="Get list of analytics",
     *      description="Returns list of analytics",
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
     * Returns list of analytics
     */
    public function index()
    {
        $analytic = Analytic::all();
        return response()->json($analytic);
    }

    /**
     * @OA\Post(
     *      path="/analytic",
     *      operationId="createAnAnalytic",
     *      tags={"Analytic"},
     *      summary="Create an analytic",
     *      description="Create an analytic",
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
     * Create a analytic
     */
    public function store(Request $request)
    {
        $analytic = Analytic::create($request->all());
        return response()->json($analytic, 201);
    }

    /**
     * @OA\Get(
     *     path="/analytic/:id",
     *     operationId="getAnAnalytic",
     *     summary="Get an analytic",
     *     tags={"Analytic"},
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
     * Get an analytic
     */
    public function show(Analytic $analytic)
    {
        return response()->json($analytic);
    }

    /**
     * @OA\Put(
     *     path="/analytic/:id",
     *     operationId="updateAnAnalytic",
     *     summary="Update an analytic",
     *     tags={"Analytic"},
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
     * Update an analytic
     */
    public function update(Request $request, Analytic $analytic)
    {
        $analytic->update($request->all());
        return response()->json($analytic);
    }

    /**
     * @OA\Delete(
     *     path="/analytic/:id",
     *     operationId="deleteAnAnalytic",
     *     summary="Delete an analytic",
     *     tags={"Analytic"},
     *      @OA\Response(
     *          response=204,
     *          description="Successful operation"
     *       ),
     *       @OA\Response(response=400, description="Bad request"),
     *       security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     * 
     * Delete an analytic
     */
    public function destroy(Analytic $analytic)
    {
        $analytic->delete();
        return response()->json(null,204);
    }
}
