<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    protected $fillable = [
        'numero_atendimento',
        'nome_completo',
        'sexo',
        'email',
        'celular',
    ];

    public function exames()
    {
        return $this->belongsToMany(Exame::class, 'paciente_exame', 'paciente_id', 'exame_id');
    }
}
