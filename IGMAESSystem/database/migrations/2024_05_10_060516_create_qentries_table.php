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
        Schema::create('qentries', function (Blueprint $table) {
            $table->id();
            $table->boolean('approve')->default(false);
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('email')->nullable();
            $table->date('birthday')->nullable();
            $table->date('contactnum')->nullable();
            $table->string('ipaddress')->nullable();
            $table->unsignedBigInteger('access_id');
            $table->unsignedBigInteger('accountused_id')->nullable();
            $table->foreign('access_id')->references('id')->on('accesses')->onDelete('cascade');
            $table->foreign('accountused_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qentries');
    }
};
