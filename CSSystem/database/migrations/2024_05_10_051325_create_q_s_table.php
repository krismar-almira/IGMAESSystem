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
        Schema::create('q_s', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('qset_id');
            $table->boolean('isString')->default(false);
            $table->boolean('isRequire')->default(false);
            $table->timestamps();

            $table->foreign('qset_id')->references('id')->on('qsets');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('q_s');
    }
};
