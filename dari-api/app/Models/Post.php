<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model {
    protected $fillable = [
        'type','title','description','category_id','state_id',
        'level','anonymous','lat','lng','address','created_by'
    ];
    public function category(){ return $this->belongsTo(Category::class); }
    public function state(){ return $this->belongsTo(State::class); }
    public function author(){ return $this->belongsTo(User::class, 'created_by'); }
}

