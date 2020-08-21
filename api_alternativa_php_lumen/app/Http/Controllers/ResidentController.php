<?php
namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ResidentController extends Controller{
    public function createResident(\Illuminate\Http\Request $request){
        $name = $request->json()->get('name');
        $cpf = $request->json()->get('cpf');
        $password = password_hash($request->json()->get('password'), PASSWORD_DEFAULT);
        $telephone = $request->json()->get('telephone');
        $number = $request->json()->get('number');
        $block = $request->json()->get('block');
        $profile = $request->json()->get('profile');

        try {
            $create = DB::insert("INSERT INTO residents (name, cpf, password, telephone, number, block, profile) VALUES (?, ?, ?, ?, ?, ?, ?)", [$name, $cpf, $password, $telephone, $number, $block, $profile]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['erro' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        if ($create) {
            return response($request->json()->all(), Response::HTTP_OK);
        }
    }
}
