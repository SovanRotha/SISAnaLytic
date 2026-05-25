<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseYear;

class CourseYearController extends Controller
{
    //
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_year' => 'required|string|unique:courseyear',
        ]);

        $courseYear = CourseYear::create($validated);

        return response()->json(['message' => 'Course year created successfully', 'courseYear' => $courseYear], 201);
    }

    public function show()
    {
        $courseYears = CourseYear::all();
        return response()->json(['message' => 'Course years retrieved successfully', 'courseYears' => $courseYears]);
    }

    public function update(Request $request, $id)
    {
        $courseYear = CourseYear::find($id);
        if (!$courseYear) {
            return response()->json(['message' => 'Course year not found'], 404);
        }

        $validated = $request->validate([
            'course_year' => 'sometimes|required|string|unique:courseyear,course_year,' . $id,
        ]);

        $courseYear->update($validated);

        return response()->json(['message' => 'Course year updated successfully', 'courseYear' => $courseYear]);
    }

    public function delete($id)
    {
        $courseYear = CourseYear::find($id);
        if (!$courseYear) {
            return response()->json(['message' => 'Course year not found'], 404);
        }

        $courseYear->delete();
        return response()->json(['message' => 'Course year deleted successfully']);
    }

    public function showbyid($id)
{
    $courseYear = CourseYear::where('course_department_id', $id)->get();

    if ($courseYear->isEmpty()) {
        return response()->json([
            'message' => 'No course years found'
        ], 404);
    }

    return response()->json([
        'message' => 'Course year retrieved successfully',
        'courseYear' => $courseYear
    ]);
}

    // public function showCourses($id)
    // {
    //     $courseYear = CourseYear::find($id);
    //     if (!$courseYear) {
    //         return response()->json(['message' => 'Course year not found'], 404);
    //     }

    //     $courses = $courseYear->courses()->get();
    //     return response()->json(['message' => 'Courses retrieved successfully', 'courses' => $courses]);
    // }
}
