<?php

namespace App\Models;

use App\Models\Product;
use App\Models\GroupWorker;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Inventory extends Model
{
  use HasFactory;
  function GroupWorker(){
    return $this->hasMany(GroupWorker::class);
  }
  function Product(){
    return $this->hasOne(Product::class,'id', 'product_id');
  }
}
