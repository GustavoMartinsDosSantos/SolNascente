<?php
namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class LostAndFoundController extends Controller
{

    public function index(\Illuminate\Http\Request $request)
    {
        try {
            $search = DB::select("SELECT lost_and_found.*, residents.name FROM lost_and_found LEFT JOIN residents ON residents.id = lost_and_found.id_input_person WHERE id_withdrawal_person IS NULL;");
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['erro' => true], Response::HTTP_BAD_REQUEST);
        }

        if ($search) {
            return response()->json($search, Response::HTTP_OK);
        }
    }

    public function createItem(\Illuminate\Http\Request $request){
        $description = $request->json()->get('description');
        $local = $request->json()->get('local');
        $idUsuario = JWTAuth::getPayload(JWTAuth::getToken())->toArray()['sub'];

        $cpf = $request->json()->get('cpf');
        $idTicket = $request->json()->get('id');

        if(!empty($idTicket)){
            updateItem($idUsuario, $idTicket);
        }

        try {
            $create = DB::insert("INSERT INTO lost_and_found (id_input_person, description, local) VALUES (?, ?, ?)", [$idUsuario, $description, $local]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['erro' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        if ($create) {
            return response($request->json()->all(), Response::HTTP_OK);
        }

        return response()->json(["erro" => "Não foi possível realizar o insert. Verifique os dados enviados e tente novamente."], Response::HTTP_BAD_REQUEST);
    }

    public function updateItem($idUsuario, $idTicket){
        try {
            $create = DB::insert("UPDATE lost_and_found SET id_withdrawal_person = ? WHERE id = ?", [$idUsuario, $idTicket]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['erro' => true], Response::HTTP_BAD_REQUEST);
        }

        if ($create) {
            return response()->json(['updated' => $idTicket], Response::HTTP_OK);
        }

        return response()->json(["erro" => "Não foi possível realizar o update. Verifique os dados enviados e tente novamente."], Response::HTTP_BAD_REQUEST);
    }
}
