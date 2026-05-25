<?php

use App\Http\Controllers\CourseYearController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SIScontroller;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseDepartmentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Protected routes by role
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
    // all admin routes here
});

Route::middleware(['auth:sanctum', 'role:teacher'])->group(function () {
    Route::get('/teacher', [TeacherController::class, 'index']);
    // all teacher routes here
});

Route::middleware(['auth:sanctum', 'role:student'])->group(function () {
    Route::get('/student', [StudentController::class, 'index']);
    // all student routes here
});

Route::post('/register', [SIScontroller::class, 'register']);
Route::post('/login', [SIScontroller::class, 'login']);
Route::get('/show', [AdminController::class, 'show'])->name('admin.show');
Route::delete('/delete/{id}', [AdminController::class, 'delete'])->name('admin.delete');
Route::put('/update/{id}', [AdminController::class, 'update'])->name('admin.update');

Route::post('/course', [CourseController::class, 'store'])->name('course.store');
Route::get('/course', [CourseController::class, 'show'])->name('course.show');
Route::put('/course/{id}', [CourseController::class, 'update'])->name('course.update');
Route::delete('/course/{id}', [CourseController::class, 'delete'])->name('course.delete');
Route::get('/course/{id}', [CourseController::class, 'showbyid'])->name('course.showbyid');

Route::post('/courseselect', [CourseController::class, 'store'])->name('course.select.store');
Route::get('/courseselect', [CourseController::class, 'show'])->name('course.select.show');
Route::put('/courseselect/{id}', [CourseController::class, 'update'])->name('course.select.update');
Route::delete('/courseselect/{id}', [CourseController::class, 'delete'])->name('course.select.delete');
Route::get('/courseselect/year/{year_id}', [CourseController::class, 'showByYear'])->name('course.select.showByYear');

Route::post('/courseyear', [CourseYearController::class, 'store'])->name('courseyear.store');
Route::get('/courseyear', [CourseYearController::class, 'show'])->name('courseyear.show');
Route::put('/courseyear/{id}', [CourseYearController::class, 'update'])->name('courseyear.update');
Route::delete('/courseyear/{id}', [CourseYearController::class, 'delete'])->name('courseyear.delete');
Route::get('/courseyear/{id}', [CourseYearController::class, 'showbyid'])->name('courseyear.showbyid');
Route::get('/courseyear/{id}/courses', [CourseYearController::class, 'showCourses'])->name('courseyear.showCourses');

Route::post('/coursedepartment', [CourseDepartmentController::class, 'store'])->name('coursedepartment.store');
Route::get('/coursedepartment', [CourseDepartmentController::class, 'show'])->name('coursedepartment.show');
Route::put('/coursedepartment/{id}', [CourseDepartmentController::class, 'update'])->name('coursedepartment.update');
Route::delete('/coursedepartment/{id}', [CourseDepartmentController::class, 'destroy'])->name('coursedepartment.delete');
Route::get('/coursedepartment/{id}', [CourseDepartmentController::class, 'showbyID'])->name('coursedepartment.showbyid');