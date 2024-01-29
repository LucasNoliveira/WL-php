<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePacientesTable extends Migration
{
    public function up()
    {
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->string('numero_atendimento')->unique();
            $table->string('nome_completo');
            $table->char('sexo', 1);
            $table->string('email')->nullable();
            $table->string('celular')->nullable();
            $table->timestamps();
        });
    }
}

?>
