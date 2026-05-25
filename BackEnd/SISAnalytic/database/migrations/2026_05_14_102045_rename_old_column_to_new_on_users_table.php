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
            $table->renameColumn('Current Address', 'current_address');
            $table->renameColumn('Permanent Address', 'permanent_address');
            $table->renameColumn('Phone Number', 'phone_number');
            $table->renameColumn('Date of Birth', 'date_of_birth');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sisuser', function (Blueprint $table) {
            //
            $table->renameColumn('current_address', 'Current Address');
            $table->renameColumn('permanent_address', 'Permanent Address');
            $table->renameColumn('phone_number', 'Phone Number');
            $table->renameColumn('date_of_birth', 'Date of Birth');
        });
    }
};
