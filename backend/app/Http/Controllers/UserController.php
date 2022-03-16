<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

use Illuminate\Http\Request;

use App\Models\User;

class UserController extends Controller
{
    public function register(Request $data)
    {
        $user = new User;
        $user->name = $data->name;
        $user->email = $data->email;
        $user->password = $data->password;
        $user->position = $data->position;

        $user->save();
        return response()->json($user, 200);
    }

    public function login(Request $data)
    {
        $user = User::where('email', $data->email)->first();
        if ($user) {
            if ($user->password == $data->password) {
                return response()->json($user, 200);
            }
            return response()->json(['message' => 'Password incorrect', 'code' => 404], 404);
        }
        return response()->json(['message' => 'User not found', 'code' => 404], 404);
    }

}
