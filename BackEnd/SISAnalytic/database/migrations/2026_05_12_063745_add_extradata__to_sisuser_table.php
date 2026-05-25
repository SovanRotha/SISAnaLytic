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
        Schema::table('sisuser', function (Blueprint $table) {
            //
            $table->string('Current Address')->nullable();
            $table->string('Permanent Address')->nullable();
            $table->string('Phone Number')->nullable();
            $table->string('Date of Birth')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sisuser', function (Blueprint $table) {
            //
                $table->dropColumn('Current Address');
                $table->dropColumn('Permanent Address');
                $table->dropColumn('Phone Number');
                $table->dropColumn('Date of Birth');

        });
    }
};
