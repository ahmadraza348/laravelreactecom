<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function latestProducts()
    {
        $products = Product::where(['status' => 1])->orderBy('created_at', 'DESC')->limit(8)->get();
        return response()->json([
            'status' => 200,
            'data' => $products,
        ], 200);
    }

    public function featuredProducts()
    {
        $products = Product::where(['status' => 1, 'is_featured'=>'yes'])->limit(8)->get();
        return response()->json([
            'status' => 200,
            'data' => $products,
        ], 200);
    }
}
