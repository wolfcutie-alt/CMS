<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * @OA\Get(
     *      path="/setting",
     *      operationId="getSettingsList",
     *      tags={"Setting"},
     *      summary="Get list of settings",
     *      description="Returns list of settings",
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
     * Returns list of settings
     */
    public function index()
    {
        $setting = Setting::all();
        return response()->json($setting);
    }

    /**
     * @OA\Post(
     *      path="/setting",
     *      operationId="createASetting",
     *      tags={"Setting"},
     *      summary="Create a setting",
     *      description="Create a setting",
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
     * Create a setting
     */
    public function store(Request $request)
    {
        $setting = Setting::create($request->all());
        return response()->json($setting);
    }

    /**
     * @OA\Get(
     *     path="/setting/:id",
     *     operationId="getASetting",
     *     summary="Get a setting",
     *     tags={"Setting"},
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
     * Return a setting
     */
    public function show(Setting $setting)
    {
        return response()->json($setting);
    }

    /**
     * @OA\Put(
     *     path="/setting/:id",
     *     operationId="updateASetting",
     *     summary="Update a setting",
     *     tags={"Setting"},
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
     * Update a setting
     */
    public function update(Request $request, Setting $setting)
    {
        $setting->update($request->all());
        return response()->json($setting);
    }
    /**
     * @OA\Delete(
     *     path="/setting/:id",
     *     operationId="deleteASetting",
     *     summary="Delete a setting",
     *     tags={"Setting"},
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
     * Delete a setting
     */
    public function destroy(Setting $setting)
    {
        $setting->delete();
        return response()->json(null,204);
    }
}
