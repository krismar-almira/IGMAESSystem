<?php

namespace Database\Seeders;

use App\Models\UserLevel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class user_level_seeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
      $data =[
        ['id'=>1, 'name'=>'SA'],
        ['id'=>2, 'name'=>'Admin'],
        ['id'=>3, 'name'=>'Employee'],
        ['id'=>4, 'name'=>'Partner Store'],
      ];
      UserLevel::insert($data);
    }
}
