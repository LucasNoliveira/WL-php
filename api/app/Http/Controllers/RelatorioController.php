<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RelatorioController extends Controller
{
    use App\Models\Paciente;

public function gerarRelatorio($pacienteId)
{
    $paciente = Paciente::with('exames')->find($pacienteId);

    return response()->json($paciente);
}
}
