import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Certifique-se de ter react-router-dom instalado

const PatientReport = () => {
    const { numero_atendimento } = useParams();
    const [patientData, setPatientData] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/pacientes/${numero_atendimento}`);
                if (response.ok) {
                    const responseData = await response.json();
                    setPatientData(responseData);
                } else {
                    console.error('Failed to fetch patient data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPatientData();
    }, [numero_atendimento]);

    if (!patientData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Relatório do Paciente</h1>
            <div>
                <strong>ID:</strong> {patientData.id}
            </div>
            <div>
                <strong>Número de Atendimento:</strong> {patientData.numero_atendimento}
            </div>
            <div>
                <strong>Nome Completo:</strong> {patientData.nome_completo}
            </div>
            <div>
                <strong>Gênero:</strong> {patientData.sexo}
            </div>
            <div>
                <strong>Email:</strong> {patientData.email}
            </div>
            <div>
                <strong>Celular:</strong> {patientData.celular || 'N/A'}
            </div>
            {/* Adicione estilos conforme necessário */}
        </div>
    );
};

export default PatientReport;
