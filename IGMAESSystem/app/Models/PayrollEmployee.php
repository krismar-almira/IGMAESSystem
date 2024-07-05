<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PayrollEmployee extends Model
{
    use HasFactory;
    protected $table = 'payroll_employees';
    protected $fillable = ['user_id', 'payroll_id', 'amount'];
    public function User()
    {
      return $this->hasOne(User::class, 'id', 'user_id');
    }
}
