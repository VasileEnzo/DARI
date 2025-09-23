<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
    $states = [
        ['code'=>'pending','label'=>'Pendiente'],
        ['code'=>'in_progress','label'=>'En proceso'],
        ['code'=>'resolved','label'=>'Resuelto'],
        ['code'=>'dismissed','label'=>'Descartado'],
    ];
    \App\Models\State::insert($states);
}

}
