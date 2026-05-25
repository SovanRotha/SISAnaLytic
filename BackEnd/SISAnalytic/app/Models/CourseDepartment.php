<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseDepartment extends Model
{
    use HasFactory;

    protected $table = 'coursedepartment';

    protected $fillable = [
        'course_department'
    ];

    public function courseyear()
    {
        return $this->hasMany(CourseYear::class);
    }

    public function courseselect()
    {
        return $this->hasMany(CourseModel::class);
    }
}
