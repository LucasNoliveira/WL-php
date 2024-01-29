// CadastroPacienteForm.js
import React, { useState } from 'react';

const CadastroPacienteForm = () => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Montar os dados do formulário
        const formData = {
            nome: nome,
            idade: idade,
            email: email,
        };

        // Enviar os dados para a API Laravel
        try {
            const response = await fetch('http://127.0.0.1:8000/api/cadastrar-paciente/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('Dados enviados com sucesso!');
                // Lógica adicional se necessário
            } else {
                console.error('Erro ao enviar dados para a API:', responseData.error);
            }
        } catch (error) {
            console.error('Erro ao comunicar com a API:', error);
        }
    }

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </label>
                <br />
                <label>
                    Idade:
                    <input type="text" value={idade} onChange={(e) => setIdade(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <button type="submit">Enviar</button>
            </form>
        );
    };

    export default CadastroPacienteForm;
