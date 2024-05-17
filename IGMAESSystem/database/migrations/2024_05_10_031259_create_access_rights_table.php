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
        Schema::create('access_rights', function (Blueprint $table) {
            $table->boolean('edit')->nullable()->default(false);
            $table->boolean('delete')->nullable()->default(false);
            $table->boolean('view')->nullable()->default(false);
            $table->string('module', 100);
            $table->string('submodule', 100);
            $table->unsignedBigInteger('user_level_id');
            $table->foreign('user_level_id')->references('id')->on('user_levels')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_rights');
    }
};
