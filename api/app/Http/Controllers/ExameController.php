<?php

namespace App\Http\Controllers;

use App\Models\Exame;
use Illuminate\Http\Request;

class ExameController extends Controller
{
    public function cadastrarExame(Request $request)
    {
        // Validação dos dados
        $request->validate([
            'codigo' => 'required|unique:exames',
            'descricao' => 'required',
            'valor' => 'required|numeric',
        ]);

        // Criação do exame
        $exame = Exame::create([
            'codigo' => $request->input('codigo'),
            'descricao' => $request->input('descricao'),
            'valor' => $request->input('valor'),
        ]);

        return response()->json($exame, 201);
    }
}
