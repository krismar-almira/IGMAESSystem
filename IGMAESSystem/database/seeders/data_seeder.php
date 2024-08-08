<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Inventory;
use App\Models\UserLevel;
use App\Models\GroupWorker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class data_seeder extends Seeder
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


      $data = [
        [
          'id'=>1,
          'name'=>'sa',
          'email'=>'sa@sa.net',
          'password' => Hash::make('igmaesadmin01'),
          'address' => 'antique',
          'contact_no' => '092229',
          'location' => 'images/sampleimage/profile.png',
          'filename' => 'na',
          'designation' => 'super admin',
          'username'=>'igmaesadmin',
          'user_level_id' => 3,
        ],
        [
            'id' => 11,
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'password' => Hash::make('password1'),
            'address' => '123 Main St',
            'contact_no' => '09123456789',
            'location' => 'images/sampleimage/profile.png',
            'filename' => 'file1.jpg',
            'designation' => 'admin',
            'username' => 'johndoe',
            'user_level_id' => 3,
        ],
        [
            'id' => 2,
            'name' => 'Jane Smith',
            'email' => 'jane.smith@example.com',
            'password' => Hash::make('password2'),
            'address' => '456 Elm St',
            'contact_no' => '09234567890',
            'location' => 'images/sampleimage/profile.png',
            'filename' => 'file2.jpg',
            'designation' => 'manager',
            'username' => 'janesmith',
            'user_level_id' => 3,
        ],
        [
            'id' => 3,
            'name' => 'Alice Johnson',
            'email' => 'alice.johnson@example.com',
            'password' => Hash::make('password3'),
            'address' => '789 Oak St',
            'contact_no' => '09345678901',
            'location' => 'images/sampleimage/profile.png',
            'filename' => 'file3.jpg',
            'designation' => 'supervisor',
            'username' => 'alicejohnson',
            'user_level_id' => 3,
        ],
        [
            'id' => 4,
            'name' => 'Bob Brown',
            'email' => 'bob.brown@example.com',
            'password' => Hash::make('password4'),
            'address' => '101 Pine St',
            'contact_no' => '09456789012',
            'location' => 'City D',
            'filename' => 'images/sampleimage/profile.png',
            'designation' => 'employee',
            'username' => 'bobbrown',
            'user_level_id' => 3,
        ],
        [
            'id' => 5,
            'name' => 'Charlie Davis',
            'email' => 'charlie.davis@example.com',
            'password' => Hash::make('password5'),
            'address' => '202 Maple St',
            'contact_no' => '09567890123',
            'location' => 'images/sampleimage/profile.png',
            'filename' => 'file5.jpg',
            'designation' => 'intern',
            'username' => 'charliedavis',
            'user_level_id' => 3,
        ],
        [
            'id' => 6,
            'name' => 'Diana Evans',
            'email' => 'diana.evans@example.com',
            'password' => Hash::make('password6'),
            'address' => '303 Cedar St',
            'contact_no' => '09678901234',
            'location' => 'images/sampleimage/profile.png',
            'filename' => 'file6.jpg',
            'designation' => 'consultant',
            'username' => 'dianaevans',
            'user_level_id' => 3,
        ],
        [
            'id' => 7,
            'name' => 'Evan Foster',
            'email' => 'evan.foster@example.com',
            'password' => Hash::make('password7'),
            'address' => '404 Birch St',
            'contact_no' => '09789012345',
            'location' => 'images/sampleimage/profile.png',
            'filename' => 'file7.jpg',
            'designation' => 'analyst',
            'username' => 'evanfoster',
            'user_level_id' => 3,
        ],
        [
            'id' => 8,
            'name' => 'Fiona Green',
            'email' => 'fiona.green@example.com',
            'password' => Hash::make('password8'),
            'address' => '505 Spruce St',
            'contact_no' => '09890123456',
            'location' => 'images/sampleimage/profile.png',
            'filename' => 'file8.jpg',
            'designation' => 'technician',
            'username' => 'fionagreen',
            'user_level_id' => 3,
        ],
        [
            'id' => 9,
            'name' => 'George Harris',
            'email' => 'george.harris@example.com',
            'password' => Hash::make('password9'),
            'address' => '606 Redwood St',
            'contact_no' => '09901234567',
            'location' => 'images/sampleimage/profile.png',
            'filename' => 'file9.jpg',
            'designation' => 'engineer',
            'username' => 'georgeharris',
            'user_level_id' => 3,
        ],
        [
            'id' => 10,
            'name' => 'Hannah Irvine',
            'email' => 'hannah.irvine@example.com',
            'password' => Hash::make('password10'),
            'address' => '707 Willow St',
            'contact_no' => '09112345678',
            'location' => 'images/sampleimage/profile.png',
            'filename' => 'file10.jpg',
            'designation' => 'super admin',
            'username' => 'hannahirvine',
            'user_level_id' => 3,
        ],
      ];
      User::insert($data);
      
      //product
      $data=[
        [
            'id' => 1,
            'name' => 'banana chips',
            'description' => 'best chips',
            'type' => 'chips',
            'unit_measure' => 'pcs',
            'price' => 10,
            'location' => 'images/sampleimage/images.jpeg',
            'file_name' => 'chip1.png',
        ],
        [
            'id' => 2,
            'name' => 'apple chips',
            'description' => 'crunchy and sweet',
            'type' => 'chips',
            'unit_measure' => 'pcs',
            'price' => 12,
            'location' => 'images/sampleimage/images.jpeg',
            'file_name' => 'chip2.png',
        ],
        [
            'id' => 3,
            'name' => 'potato chips',
            'description' => 'classic snack',
            'type' => 'chips',
            'unit_measure' => 'pcs',
            'price' => 8,
            'location' => 'images/sampleimage/images.jpeg',
            'file_name' => 'chip3.png',
        ],
        [
            'id' => 4,
            'name' => 'carrot chips',
            'description' => 'healthy and tasty',
            'type' => 'chips',
            'unit_measure' => 'pcs',
            'price' => 15,
            'location' => 'images/sampleimage/images.jpeg',
            'file_name' => 'chip4.png',
        ],
        [
            'id' => 5,
            'name' => 'beetroot chips',
            'description' => 'nutritious and delicious',
            'type' => 'chips',
            'unit_measure' => 'pcs',
            'price' => 14,
            'location' => 'images/sampleimage/images.jpeg',
            'file_name' => 'chip5.png',
        ],
        [
            'id' => 6,
            'name' => 'kale chips',
            'description' => 'crispy and healthy',
            'type' => 'chips',
            'unit_measure' => 'pcs',
            'price' => 18,
            'location' => 'images/sampleimage/images.jpeg',
            'file_name' => 'chip6.png',
        ],
        [
            'id' => 7,
            'name' => 'zucchini chips',
            'description' => 'light and crispy',
            'type' => 'chips',
            'unit_measure' => 'pcs',
            'price' => 16,
            'location' => 'images/sampleimage/images.jpeg',
            'file_name' => 'chip7.png',
        ],
        [
            'id' => 8,
            'name' => 'sweet potato chips',
            'description' => 'sweet and crunchy',
            'type' => 'chips',
            'unit_measure' => 'pcs',
            'price' => 13,
            'location' => 'images/sampleimage/images.jpeg',
            'file_name' => 'chip8.png',
        ],
        [
            'id' => 9,
            'name' => 'pumpkin chips',
            'description' => 'seasonal delight',
            'type' => 'chips',
            'unit_measure' => 'pcs',
            'price' => 17,
            'location' => 'images/sampleimage/images.jpeg',
            'file_name' => 'chip9.png',
        ],
        [
            'id' => 10,
            'name' => 'spinach chips',
            'description' => 'green and crispy',
            'type' => 'chips',
            'unit_measure' => 'pcs',
            'price' => 11,
            'location' => 'images/sampleimage/images.jpeg',
            'file_name' => 'chip10.png',
        ],
      ];
      Product::insert($data);
      $data =[];
      for ($i=0; $i < 2000; $i++) { 
        array_push($data,[
          'id' => $i+1,
          'product_id' => rand(1,10),
          'quantity' => rand(10,50),
          'quantity_sold' => rand(10,50),
          'user_share' => rand(500,1000),
          'employer_share' => rand(500,1000),
          'expense' => rand(500,1000),
          'expiration' => '2025-'.rand(1,7).'-'.rand(1,28),
          'date_entry' => rand(2022,2023).'-'.rand(1,12).'-'.rand(1,28),
        ]);
      }
      $inventory_max =2500;
      for ($i=2000; $i < $inventory_max; $i++) { 
        array_push($data,[
          'id' => $i+1,
          'product_id' => rand(1,10),
          'quantity' => rand(10,50),
          'quantity_sold' => rand(10,50),
          'user_share' => rand(500,1000),
          'employer_share' => rand(500,1000),
          'expense' => rand(500,1000),
          'expiration' => '2025-'.rand(1,7).'-'.rand(1,28),
          'date_entry' => '2024-'.rand(1,6).'-'.rand(1,28),
        ]);
      }
      Inventory::insert($data);

      $data =[];
      for ($i=1; $i < $inventory_max; $i++) { 
        for ($k=rand(2,10); $k < rand(2,10); $k++) {  //user
          array_push($data,[
            //'id' => $i+1,
            'user_id' => $k,
            'inventory_id' => $i,
            'employee_share'=> rand(1,100)
          ]);
        }
        
      }
      GroupWorker::insert($data);
    }
}
