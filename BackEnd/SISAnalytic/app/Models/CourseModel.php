<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseModel extends Model
{
    use HasFactory;

    protected $table = 'courseselect';

    protected $fillable = [
        'course_department_id',
        'course_year_id',
        'course_code',
        'course_name',
        'instructor',
        'section',
        'description',
        'credits',
        'department'
    ];

    public function courseyear()
    {
        return $this->belongsTo(CourseYear::class);
    }

    public function coursedepartment()
    {
        return $this->belongsTo(CourseDepartment::class);
    }
    
}
