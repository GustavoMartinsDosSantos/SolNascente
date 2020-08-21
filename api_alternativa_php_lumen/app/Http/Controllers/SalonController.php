<?php
namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class SalonController extends Controller
{

    public function index(\Illuminate\Http\Request $request)
    {
        try {
            $search = DB::select("SELECT salon_reservation.*, residents.name, residents.cpf FROM salon_reservation LEFT JOIN residents ON residents.id = salon_reservation.id_resident;");
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['erro' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        if ($search) {
            return response()->json($search, Response::HTTP_OK);
        }
    }

    public function reserveSalon(\Illuminate\Http\Request $request){
        $startReservation = $request->json()->get('startReservation');
        $endReservation = $request->json()->get('endReservation');
        $resident_id = JWTAuth::getPayload(JWTAuth::getToken())->toArray()['sub'];

        try {
            //BUG
            $create = DB::insert("INSERT INTO salon_reservation (id_resident, start_reservation, end_reservation) VALUES (?, ?, ?)", [$resident_id, $startReservation, $endReservation]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['erro' => true], Response::HTTP_BAD_REQUEST);
        }

        if ($create) {
            return response($request->json()->all(), Response::HTTP_OK);
        }

        return response()->json(["erro" => "Não foi possível realizar o insert. Verifique os dados enviados e tente novamente."], Response::HTTP_BAD_REQUEST);
    }
}
