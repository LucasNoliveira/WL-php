<?php

namespace App\Http\Controllers;

use App\Models\Exame;
use Illuminate\Http\Request;

class ExameController extends Controller
{
    public function cadastrarExame(Request $request)
    {
        $request->validate([
            'codigo' => 'required|unique:exames',
            'descricao' => 'required',
            'valor' => 'required|numeric',
        ]);

        $exame = Exame::create([
            'codigo' => $request->input('codigo'),
            'descricao' => $request->input('descricao'),
            'valor' => $request->input('valor'),
        ]);

        return response()->json($exame, 201);
    }

    public function visualizarExames()
    {
        $exames = Exame::all();

        return response()->json($exames, 200);
    }
}
