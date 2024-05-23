
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
        Schema::table('users', function (Blueprint $table) {
          $table->string('address', 100);
          $table->string('contact_no', 100);
          $table->string('designation', 200);
          $table->unsignedBigInteger('user_level_id');
          $table->string('username');

          $table->foreign('user_level_id')->references('id')->on('user_levels');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};

