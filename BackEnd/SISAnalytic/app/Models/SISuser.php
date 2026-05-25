<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class SISuser extends Model
{
    use HasFactory;
    use HasApiTokens;
    protected $table = 'sisuser';
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'major',
        'profile_picture',
        'current_address',
        'permanent_address',
        'phone_number',
        'date_of_birth'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Automatically hash the password when setting it.
     * (Available in recent Laravel versions.)
     */
    protected $casts = [
        'password' => 'hashed',
    ];

}
