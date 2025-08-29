<?php

namespace App\Http\Controllers\admin;

use App\Models\Product;
use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\File;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $products = Product::orderBy('created_at', "DESC")->with('categories')->get();
        return response()->json([
            'status' => 200,
            'message' => 'Products Fetched Successfully',
            'data' => $products
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required',
            'category_id' => 'required',
            'sku' => 'required',
            'status' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors(),
            ], 400);
        }
        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->sku = $request->sku;
        $product->barcode = $request->barcode;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->save();

        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $product->id . "." . $ext;

                // create small Thumbnails here
                $sourcepath = public_path('uploads/temp/' . $tempImage->name);
                $destpath = public_path('uploads/products/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcepath);
                $image->coverDown(500, 600);
                $image->save($destpath);

                // create large Thumbnails here
                $destpath = public_path('uploads/products/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcepath);
                $image->scaleDown(1200);
                $image->save($destpath);

                $product->image =  $fileName;
                $product->save();
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product Saved Successfully',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'product' => $product,
        ], 200);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required',
            'category_id' => 'required',
            'sku' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors(),
            ], 400);
        }

        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->sku = $request->sku;
        $product->barcode = $request->barcode;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->save();

        
        if ($request->imageId > 0) {
                        $oldImage = $product->image;

            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $product->id . "." . $ext;

                // create small Thumbnails here
                $sourcepath = public_path('uploads/temp/' . $tempImage->name);
                $destpath = public_path('uploads/products/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcepath);
                $image->coverDown(500, 600);
                $image->save($destpath);

                // create large Thumbnails here
                $destpath = public_path('uploads/products/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcepath);
                $image->scaleDown(1200);
                $image->save($destpath);

                $product->image =  $fileName;
                $product->save();
            }
             if ($oldImage != "") {
                File::delete(public_path('uploads/services/large/' . $oldImage));
                File::delete(public_path('uploads/services/small/' . $oldImage));
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product Updated Successfully',
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product deleted successfully',
        ], 200);
    }
}
