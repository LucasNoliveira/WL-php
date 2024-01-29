<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    public function cadastrarPaciente(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'nome_completo' => 'required',
            'sexo' => 'required|in:M,F',
            'email' => 'nullable|email',
            'celular' => 'nullable',
            'exames' => 'required|array', // Certifique-se de que 'exames' seja um array
        ]);

        // Geração de número de atendimento aleatório
        $numeroAtendimento = mt_rand(100000, 999999);

        // Criação do paciente
        $paciente = Paciente::create([
            'numero_atendimento' => $numeroAtendimento,
            'nome_completo' => $request->input('nome_completo'),
            'sexo' => $request->input('sexo'),
            'email' => $request->input('email'),
            'celular' => $request->input('celular'),
        ]);

        // Vinculação dos exames ao paciente
        $paciente->exames()->attach($request->input('exames'));

        return response()->json($paciente, 201);
    }
}
