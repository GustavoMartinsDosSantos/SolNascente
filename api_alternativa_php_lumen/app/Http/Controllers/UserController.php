<?php
namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class UserController extends Controller{

    public function index(\Illuminate\Http\Request $request){

        try {
            $search = array_merge(DB::select("SELECT id, name, cpf, profile, telephone, number, block FROM residents ORDER BY id ASC;"), DB::select("SELECT id, name, cpf, office FROM employees ORDER BY id ASC;", []));
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['erro' => true], Response::HTTP_BAD_REQUEST);
        }

        if ($search) {
            return response()->json($search, Response::HTTP_OK);
        }
    }

    public function deleteUser(\Illuminate\Http\Request $request){
        $cpf = $request->json()->get('cpf');
        $tabelasPossiveis = ["employees", "residents"];

        foreach ($tabelasPossiveis as $possivelTabela) {
            $create = DB::delete("DELETE FROM {$possivelTabela} WHERE cpf = ? LIMIT 1", [$cpf]);

            if ($create) {
                return response($request->json()->all(), Response::HTTP_OK);
            }
        }

        return response()->json(["erro" => "Não foi possível realizar a exclusão. Observe os dados enviados e tente novamente."], Response::HTTP_BAD_REQUEST);
    }
}
