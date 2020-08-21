<?php
namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;


class AuthController extends Controller{

    public function authenticateUser(\Illuminate\Http\Request $request){
        $cpf = $request->json()->get('cpf');
        $password = $request->json()->get('password');

        $search = DB::selectOne("SELECT id, name, cpf, password, profile FROM (SELECT id, name, cpf, password, profile FROM residents UNION SELECT id, name, cpf, password, office FROM employees) AS A WHERE cpf = ?", [$cpf]);

        if ($search) {
            if (password_verify($password, $search->password)) {
                $factory = JWTFactory::customClaims([
                    'sub'   => $search->id,
                    'cpf' => $search->cpf
                ]);
                $payload = $factory->make();
                $token = (string)JWTAuth::encode($payload);
                return response()->json(['id' => $search->id, 'token' => $token, 'profile' => $search->profile], Response::HTTP_OK);
            }
            return response()->json(['erro' => 'Senha incorreta!'], Response::HTTP_BAD_REQUEST);
        }
        return response()->json(['erro' => 'O CPF estava incorreto e o usuário não foi encontrado!'], Response::HTTP_BAD_REQUEST);
    }
}
