<?php

namespace App\Models;

use App\Models\User;
use App\Models\PayrollEmployee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payroll extends Model
{
    use HasFactory;
    protected $fillable = ['start_date','end_date',  'created_user_id'];
    public function employee(){
      return $this->hasMany(PayrollEmployee::class);
    }
    public function createbyuser(){
      return $this->hasOne(User::class, 'id', 'created_user_id');
    }
}
