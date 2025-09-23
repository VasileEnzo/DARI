<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
    $data = [
        ['scope'=>'environment','name'=>'Basura','slug'=>'basura'],
        ['scope'=>'environment','name'=>'Contaminación de agua','slug'=>'agua'],
        ['scope'=>'environment','name'=>'Contaminación de aire','slug'=>'aire'],
        ['scope'=>'incident','name'=>'Incendio','slug'=>'incendio'],
        ['scope'=>'incident','name'=>'Derrame','slug'=>'derrame'],
    ];
    \App\Models\Category::insert($data);
}

}
