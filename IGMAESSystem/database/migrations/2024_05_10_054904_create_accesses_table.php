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
        Schema::create('accesses', function (Blueprint $table) {
            $table->id();
            $table->string('uniqueaccess');
            $table->unsignedBigInteger('createdbyuser_id');
            $table->integer('maximumentry')->nullable();
            $table->unsignedBigInteger('office_id');
            $table->unsignedBigInteger('department_id');
            $table->unsignedBigInteger('qset_id');
            $table->boolean('isclosed')->default(false);
            $table->boolean('isprotected')->default(false);

            $table->foreign('office_id')->references('id')->on('offices');
            $table->foreign('department_id')->references('id')->on('departments');
            $table->foreign('qset_id')->references('id')->on('qsets');

            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accesses');
    }
};
