<?php

// Arquivo: database/migrations/YYYY_MM_DD_create_paciente_exame_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePacienteExameTable extends Migration
{
    public function up()
    {
        Schema::create('paciente_exame', function (Blueprint $table) {
            $table->id();
            $table->foreignId('paciente_id')->constrained();
            $table->foreignId('exame_id')->constrained();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('paciente_exame');
    }
}
