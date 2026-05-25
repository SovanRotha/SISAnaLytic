<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseDepartment;
use App\Models\CourseYear;
use App\Models\CourseModel;

class CourseDepartmentController extends Controller
{
   //

   public function store(Request $request)
   {
       $validated = $request->validate([
           'course_department' => 'required|string|unique:coursedepartment',
       ]);

       $courseDepartment = CourseDepartment::create([
           'course_department' => $validated['course_department'],
       ]);

       return response()->json(['message' => 'Course department created successfully', 'course_department' => $courseDepartment], 201);
   }

   public function showbyID($id)
   {
       $courseDepartment = CourseDepartment::with('courseyear.courseselect')->find($id);

       if (!$courseDepartment) {
           return response()->json(['message' => 'Course department not found'], 404);
       }

       return response()->json(['course_department' => $courseDepartment], 200);
   }

   public function show(){
    $courseDepartments = CourseDepartment::with('courseyear.courseselect')->get();

    return response()->json(['course_departments' => $courseDepartments], 200);
   }

   public function destroy($id)
   {
       $courseDepartment = CourseDepartment::find($id);

       if (!$courseDepartment) {
           return response()->json(['message' => 'Course department not found'], 404);
       }

       $courseDepartment->delete();

       return response()->json(['message' => 'Course department deleted successfully'], 200);
   }
   public function update(Request $request, $id)
   {
       $courseDepartment = CourseDepartment::find($id);

       if (!$courseDepartment) {
           return response()->json(['message' => 'Course department not found'], 404);
       }

       $validated = $request->validate([
           'course_department' => 'required|string|unique:coursedepartment,course_department,' . $id,
       ]);

       $courseDepartment->update([
           'course_department' => $validated['course_department'],
       ]);

       return response()->json(['message' => 'Course department updated successfully', 'course_department' => $courseDepartment], 200);
   }
}
