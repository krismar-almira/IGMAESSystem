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
        Schema::create('qanswers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('entry_id');
            $table->string('stringanswer');
            $table->unsignedBigInteger('q_id');
            $table->unsignedBigInteger('qselect_id');
            $table->foreign('entry_id')->references('id')->on('qentries')->onDelete('cascade');
            $table->foreign('q_id')->references('id')->on('q_s')->onDelete('cascade');
            $table->foreign('qselect_id')->references('id')->on('qselects')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qanswers');
    }
};
