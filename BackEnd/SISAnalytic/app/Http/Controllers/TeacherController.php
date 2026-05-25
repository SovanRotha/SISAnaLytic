<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TeacherController extends Controller
{
    //
    public function index(){
        return response()->json(["message" => "welcome to teacher page"]);
    }
}
