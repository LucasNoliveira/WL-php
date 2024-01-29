<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exame extends Model
{
    protected $fillable = [
        'codigo',
        'descricao',
        'valor',
    ];

    public function pacientes()
    {
        return $this->belongsToMany(Paciente::class, 'paciente_exame', 'exame_id', 'paciente_id');
    }
}
