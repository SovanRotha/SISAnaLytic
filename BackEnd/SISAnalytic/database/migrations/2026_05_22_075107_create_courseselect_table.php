<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courseselect', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_department_id')->constrained('coursedepartment')->onDelete('cascade');
            $table->foreignId('course_year_id')->constrained('courseyear')->onDelete('cascade');
            $table->string('course_code')->unique();
            $table->string('course_name');
            $table->string('instructor');
            $table->integer('section');
            $table->text('description')->nullable();
            $table->integer('credits');
            $table->string('department');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courseselect');
    }
};
