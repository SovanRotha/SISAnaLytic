<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CourseModel;

class CourseYear extends Model
{
    use HasFactory;

    protected $table = 'courseyear';

    protected $fillable = [
        'course_year', 'course_department_id'
    ];

    public function courseselect()
    {
        return $this->hasMany(CourseModel::class);
    }

    public function coursedepartment()
    {
        return $this->belongsTo(CourseDepartment::class);
    }
    
}
