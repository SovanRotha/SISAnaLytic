<?php

namespace App\Http\Controllers;

use App\Models\SISuser;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
    public function index()
    {
        return response()->json(["message" => "welcome to admin page"]);
    }
    public function show()
    {
        // Retrieve selected columns from SISuser table
        $users = SISuser::all();

        // Return data as JSON response
        return response()->json([
            'message' => 'Data retrieved successfully',
            'data' => $users
        ]);
    }
    public function delete($id){
        $user = SISuser::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
    public function update(Request $request, $id){
        $user = SISuser::find($id);
        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:sisuser,email,' . $id,
            'role' => 'sometimes|required|string|in:admin,teacher,student',
            'major' => 'sometimes|required|string|max:255',
            'password' => 'sometimes|required|string|min:6',
            'profile_picture' => 'sometimes|nullable|string|max:255',
            'phone_number' => 'sometimes|nullable|string|max:20',
            'date_of_birth' => 'sometimes|nullable|date',
            'current_address' => 'sometimes|nullable|string|max:255',
            'permanent_address' => 'sometimes|nullable|string|max:255'
        ]);
        $user->update($validatedData);
        return response()->json(['message' => 'User updated successfully']);
    }
}
