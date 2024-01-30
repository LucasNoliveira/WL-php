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
            'exames' => 'nullable|array',
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

        if ($request->has('exames')) {
            $paciente->vincularExames($request->input('exames'));
        }

        return response()->json(['numero_atendimento' => $numeroAtendimento], 201);
    }

    public function listarPacientes()
    {
        $pacientes = Paciente::with('exames')->get();

        return response()->json($pacientes);
    }

    public function obterPaciente($numeroAtendimento)
    {
        $paciente = Paciente::where('numero_atendimento', $numeroAtendimento)->with('exames')->first();

        if ($paciente) {
            return response()->json($paciente);
        } else {
            return response()->json(['message' => 'Paciente não encontrado'], 404);
        }
    }
}
