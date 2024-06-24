<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GroupWorker extends Model
{
    use HasFactory;
    function user(){
      return $this->hasOne(User::class, 'id', 'user_id');
    }
}
