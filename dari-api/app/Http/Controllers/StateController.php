<?php
namespace App\Http\Controllers;

use App\Models\State;

class StateController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => State::select('id','code','label')->orderBy('id')->get()
        ]);
    }
}
