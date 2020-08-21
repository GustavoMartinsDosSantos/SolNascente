<?php
namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller{
    public function createEmployee(\Illuminate\Http\Request $request){
        $name = $request->json()->get('name');
        $cpf = $request->json()->get('cpf');
        $password = password_hash($request->json()->get('password'), PASSWORD_DEFAULT);
        $salary = $request->json()->get('salary');
        $office = $request->json()->get('office');

        try {
            $create = DB::insert("INSERT INTO employees (name, cpf, password, salary, office) VALUES (?, ?, ?, ?, ?)", [$name, $cpf, $password, $salary, $office]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['erro' => 'Verifique se este empregado já não foi registrado ou se há algum dado incorreto.'], Response::HTTP_BAD_REQUEST);
        }

        if ($create) {
            return response($request->json()->all(), Response::HTTP_OK);
        }
    }
}
