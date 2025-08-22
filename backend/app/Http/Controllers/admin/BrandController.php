<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::all();
        return response()->json([
            'status' => 200,
            'message' => 'brands Fetched Successfully',
            'data' => $brands
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'required|unique:brands'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'error' => $validator->errors(),
            ]);
        }

        $brand = new Brand();
        $brand->name = $request->name;
        $brand->slug = Str::slug($request->slug);
        $brand->status = $request->status ?? 1;
        $brand->save();

        return response()->json([
            'status' => 200,
            'message' => 'Brand Added Successfully',
            'data' => $brand
        ]);
    }

    // ✅ Update category
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'required|unique:brands,slug,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'error' => $validator->errors(),
            ]);
        }

        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand Not Found',
            ]);
        }

        $brand->name = $request->name;
        $brand->slug = Str::slug($request->slug);
        $brand->status = $request->status ?? $brand->status;
        $brand->save();

        return response()->json([
            'status' => 200,
            'message' => 'Brand Updated Successfully',
            'data' => $brand
        ]);
    }


    public function show($id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'brand Not Found',
            ]);
        }

        return response()->json([
            'status' => 200,
            'message' => 'brand FOunde Successfully',
            'data' => $brand
        ]);
    }


    public function destroy($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand Not Found',
            ]);
        }

        $brand->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Brand Deleted Successfully',
        ]);
    }
}
