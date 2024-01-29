<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RelatorioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Arquivo: routes/api.php

use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ExameController;
// use App\Http\Controllers\RelatorioController;

Route::post('/cadastrar-paciente', [PacienteController::class, 'cadastrarPaciente']);
// Route::post('/cadastrar-exame', [ExameController::class, 'cadastrarExame']);
Route::post('/cadastrar-exame', [ExameController::class, 'cadastrarExame']);
Route::get('/cadastrar-exame', [RelatorioController::class, 'gerarRelatorio']);
Route::get('/exames', [ExameController::class, 'visualizarExames']);

