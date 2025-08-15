<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function authenticate(request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        } else {
            $credentials = [
                'email' => $request->email,
                'password' => $request->password,
            ];
            if (Auth::attempt($credentials)) {

                $user = User::find(Auth::user()->id);
                if ($user->role == 'admin') {

                    $token = $user->CreateToken('token')->plainTextToken;
                    return response()->json([
                        'status' => 200,
                        'token' => $token,
                        "id" => Auth::user()->id
                    ]);
                } else {
                    return response()->json([
                        'status' => 401,
                        'message' => "You are not authorized to access the Admin panel"
                    ], 401);
                }
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => "Either Email/Password is incorrect"
                ], 401);
            }
        }
    }

    public function logout()
    {
        $user = User::find(Auth::user()->id);
        $user->tokens()->delete();
        return response()->json([
            'status' => true,
            'message' => "Logout Successfully"
        ]);
    }
}
