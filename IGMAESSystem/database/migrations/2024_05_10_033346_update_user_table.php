
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
          $table->dropColumn('name');
          $table->string('firstname', 100);
          $table->string('lastname', 100);
          $table->string('username', 200);
          $table->string('idnumber',200);
          $table->unsignedBigInteger('office_id');
          $table->unsignedBigInteger('department_id');
          $table->unsignedBigInteger('userlevel_id');
          $table->foreign('office_id')->references('id')->on('offices');
          $table->foreign('department_id')->references('id')->on('departments');
          $table->foreign('userlevel_id')->references('id')->on('user_levels');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      $table->string('name', 100);
      $table->dropColumn('firstname');
      $table->dropColumn('lastname');
      $table->dropColumn('username');
      $table->dropColumn('idnumber');
      $table->dropForeign('office_id');
      $table->dropForeign('department_id');
      $table->dropForeign('userlevel_id');
      $table->dropColumn('office_id');
      $table->dropColumn('department_id');
      $table->dropColumn('userlevel_id');
    }
};

