<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // ✅ Get all categories
    public function index()
    {
        $categories = Category::all();
        return response()->json([
            'status' => 200,
            'message' => 'Categories Fetched Successfully',
            'data' => $categories
        ]);
    }

    // ✅ Create new category
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'required|unique:categories'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'error' => $validator->errors(),
            ]);
        }

        $category = new Category();
        $category->name = $request->name;
        $category->slug = Str::slug($request->slug);
        $category->status = $request->status ?? 1;
        $category->save();

        return response()->json([
            'status' => 200,
            'message' => 'Category Added Successfully',
            'data' => $category
        ]);
    }


public function show($id)
{
    $category = Category::find($id);
    if (!$category) {
        return response()->json([
            'status' => 404,
            'message' => 'Category Not Found',
        ]);
    }

    return response()->json([
        'status' => 200,
        'message' => 'Category FOunde Successfully',
        'data' => $category
    ]);
}


    // ✅ Update category
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'required|unique:categories,slug,' . $id, // allow same slug for current category
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'error' => $validator->errors(),
            ]);
        }

        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category Not Found',
            ]);
        }

        $category->name = $request->name;
        $category->slug = Str::slug($request->slug);
        $category->status = $request->status ?? $category->status;
        $category->save();

        return response()->json([
            'status' => 200,
            'message' => 'Category Updated Successfully',
            'data' => $category
        ]);
    }

    // ✅ Delete category
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category Not Found',
            ]);
        }

        $category->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Category Deleted Successfully',
        ]);
    }
}
