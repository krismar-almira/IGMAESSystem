<?php

namespace Database\Seeders;

use App\Models\PurchaseStatus;
use App\Models\UserLevel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class initial_seeder extends Seeder
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
            'user_level_id' => 2,
        ]);
        $data =[
            ['id'=>1, 'name'=>'Pending'],
            ['id'=>2, 'name'=>'Complete'],
          ];
        PurchaseStatus::insert($data);
          
    }
}
