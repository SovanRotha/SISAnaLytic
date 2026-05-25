<?php

namespace App\Http\Controllers;

use App\Models\SISuser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class SIScontroller extends Controller
{
    //
    public function register(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:sisuser',
            'password' => 'required|string|min:8',
            'role' => 'string|in:student,teacher,admin',
            'major' => 'string|nullable',
            'profile_picture' => 'string|nullable', // profile picture is not fully working yet, so it's optional for now
            'current_address' => 'string|nullable',
            'permanent_address' => 'string|nullable',
            'phone_number' => 'string|nullable',
            'date_of_birth' => 'string|nullable',
        
        ]);

        

        // Create a new user
        $user = SISuser::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'] ?? 'student',
            'major' => $validated['major'] ?? null,
            'profile_picture' => $validated['profile_picture'] ?? null,
            'current_address' => $validated['current_address'] ?? null,
            'permanent_address' => $validated['permanent_address'] ?? null,
            'phone_number' => $validated['phone_number'] ?? null,
            'date_of_birth' => $validated['date_of_birth'] ?? null,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'User registered successfully', 'user' => $user, 'token' => $token], 201);
    }
    public function login(Request $request){
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = SISuser::where('email', $validated['email'])->first();

        if(!$user || !Hash::check($validated['password'], $user->password)){
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
    
        
        return response()->json(['message' => 'Login successful', 'user' => $user, 'token' => $token], 200);
    }

    // public function logout(Request $request){
    //     $request->user()->currentAccessToken()->delete();
    //     return response()->json(['message' => 'Logged out successfully'], 200);
    // }

}
