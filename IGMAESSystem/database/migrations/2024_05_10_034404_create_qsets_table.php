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
        Schema::create('qsets', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('creadtedbyuser_id');
            $table->boolean('isnamerequire')->default(false);
            $table->boolean('isnameshow')->default(false);
            $table->boolean('isemailrequire')->default(false);
            $table->boolean('isemailshow')->default(false);
            $table->boolean('iscontactnumrequire')->default(false);
            $table->boolean('isnumshow')->default(false);
            $table->boolean('isbirthdayrequire')->default(false);
            $table->boolean('isbirthdayshow')->default(false);

            $table->foreign('type_id')->references('id')->on('types');
            $table->foreign('creadtedbyuser_id')->references('id')->on('users');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qsets');
    }
};
