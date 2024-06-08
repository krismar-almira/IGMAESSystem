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
      Schema::table('group_workers', function (Blueprint $table) {
        $table->dropForeign('group_workers_inverntory_id_foreign');
        
        $table->dropColumn('inverntory_id');
        $table->unsignedBigInteger('inventory_id');
        $table->foreign('inventory_id')->references('id')->on('inventories')->onDelete('cascade');
        

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
