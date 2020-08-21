<?php
namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class OccurrenceController extends Controller
{

    public function index(\Illuminate\Http\Request $request)
    {
        try {
            $search = DB::select("SELECT occurrences.*, residents.name FROM occurrences LEFT JOIN residents ON residents.id = (SELECT id_resident FROM salon_reservation WHERE id = id_reservation)");
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['erro' => true], Response::HTTP_BAD_REQUEST);
        }

        if ($search) {
            return response()->json($search, Response::HTTP_OK);
        }
    }

    public function registerOccurrence(\Illuminate\Http\Request $request){
        $description = $request->json()->get('description');
        $idReservation = $request->json()->get('idReservation');
        $id = JWTAuth::getPayload(JWTAuth::getToken())->toArray()['sub'];

        try {
            $create = DB::insert("INSERT INTO occurrences (id_reservation, description) VALUES (?, ?);", [$idReservation, $description]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['erro' => true], Response::HTTP_BAD_REQUEST);
        }

        if ($create) {
            return response($request->json()->all(), Response::HTTP_OK);
        }

        return response()->json(["erro" => "Não foi possível realizar o insert. Verifique os dados enviados e tente novamente."], Response::HTTP_BAD_REQUEST);
    }
}
