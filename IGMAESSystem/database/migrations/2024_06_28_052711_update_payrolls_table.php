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
      Schema::table('payrolls', function (Blueprint $table) {
        $table->date('start_date');
        $table->date('end_date');
        $table->unsignedBigInteger('create_user_id');
        $table->foreign('create_user_id')->references('id')->on('users');
      });
     
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
