<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TempImage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
      public function store(request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:png,jpg,jpeg,gif',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors('image')
            ]);
        }

        $image = $request->image;
        $ext = $image->getClientOriginalExtension();
        $image_name = strtotime("now") . "." . $ext;

        $model = new TempImage();
        $model->name = $image_name;
        $model->save();

        $image->move(public_path('uploads/temp'),  $image_name);

        // create small Thumbnails here
        // $sourcepath = public_path('uploads/temp/' . $image_name);
        // $destpath = public_path('uploads/temp/thumb/' . $image_name);
        // $manager = new ImageManager(Driver::class);
        // $image = $manager->read($sourcepath);
        // $image->coverDown(300, 300);
        // $image->save($destpath);

        return response()->json([
            'status' => true,
            'data' => $model,
            'message' => 'Image Uploaded Successfully'
        ]);
    }
}
