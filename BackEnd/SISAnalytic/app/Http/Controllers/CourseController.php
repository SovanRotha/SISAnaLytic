<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseModel;

class CourseController extends Controller
{
    //
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_year_id' => 'required|integer|exists:courseyear,id',
            'course_code' => 'required|string|unique:courseselect,course_code',
            'course_name' => 'required|string',
            'instructor' => 'required|string',
            'section' => 'required|integer',
            'description' => 'nullable|string',
            'credits' => 'required|integer',
            'department' => 'required|string',
        ]);

        $course = CourseModel::create($validated);

        return response()->json(['message' => 'Course created successfully', 'course' => $course], 201);
    }

    public function show()
    {
        $courses = CourseModel::all();
        return response()->json(['message' => 'Courses retrieved successfully', 'courses' => $courses]);
    }

    public function update(Request $request, $id)
    {
        $course = CourseModel::find($id);
        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $validated = $request->validate([
            'course_year_id' => 'sometimes|required|integer|exists:courseyear,id',
            'course_code' => 'sometimes|required|string|unique:courseselect,course_code,' . $id,
            'course_name' => 'sometimes|required|string',
            'instructor' => 'sometimes|required|string',
            'section' => 'sometimes|required|integer',
            'description' => 'nullable|string',
            'credits' => 'sometimes|required|integer',
            'department' => 'sometimes|required|string',
        ]);

        $course->update($validated);

        return response()->json(['message' => 'Course updated successfully', 'course' => $course]);
    }

    public function delete($id)
    {
        $course = CourseModel::find($id);
        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $course->delete();
        return response()->json(['message' => 'Course deleted successfully']);
    }

    // public function showbyid($id)
    // {
    //     $course = CourseModel::find($id);
    //     if (!$course) {
    //         return response()->json(['message' => 'Course not found'], 404);
    //     }

    //     return response()->json(['message' => 'Course retrieved successfully', 'course' => $course]);
    // }

   public function showByYear($year_id){

    $courses = CourseModel::where('course_year_id', $year_id)->get();

    return response()->json([
        'message' => 'Course selection retrieved successfully',
        'courses' => $courses
    ]);
}
}
