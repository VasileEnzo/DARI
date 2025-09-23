<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class State extends Model {
    protected $fillable = ['code','label'];
    public function posts(){ return $this->hasMany(Post::class); }
}

