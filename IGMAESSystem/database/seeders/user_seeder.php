<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class user_seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
          'name'=>'sa',
          'email'=>'sa@sa.net',
          'password' => Hash::make('sa'),
          'address' => 'antique',
          'contact_no' => '092229',
          'location' => 'na',
          'filename' => 'na',
          'designation' => 'super admin',
          'username'=>'sa',
          'user_level_id' => 1,
        ]);
    }
}
