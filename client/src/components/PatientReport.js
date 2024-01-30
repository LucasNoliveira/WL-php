import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PatientReport = () => {
    const { numero_atendimento } = useParams();
    const [patientData, setPatientData] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/pacientes/${numero_atendimento}`);
                const data = await response.json();
                setPatientData(data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchPatientData();
    }, [numero_atendimento]);

    return (
        <div>
            <h1>Patient Report for {numero_atendimento}</h1>
            {patientData ? (
                <div>
                    <p>Full Name: {patientData.nome_completo}</p>
                    <p>Gender: {patientData.sexo}</p>
                    {/* Render other patient data as needed */}
                    <h2>Exams:</h2>
                    <ul>
                        {patientData.exames.map((exam, index) => (
                            <li key={index}>
                                <p>Code: {exam.codigo}</p>
                                <p>Description: {exam.descricao}</p>
                                <p>Value: {exam.valor}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading patient data...</p>
            )}
        </div>
    );
};

export default PatientReport;
