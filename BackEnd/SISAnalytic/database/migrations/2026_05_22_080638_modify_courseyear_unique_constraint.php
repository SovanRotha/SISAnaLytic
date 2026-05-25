<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courseyear', function (Blueprint $table) {

            // remove old unique
            $table->dropUnique(['course_year']);

        });

        Schema::table('courseyear', function (Blueprint $table) {

            // add new combined unique
            $table->unique([
                'course_department_id',
                'course_year'
            ]);

        });
    }

    public function down(): void
    {
        Schema::table('courseyear', function (Blueprint $table) {

            $table->dropUnique([
                'course_department_id',
                'course_year'
            ]);

            $table->unique('course_year');

        });
    }
};