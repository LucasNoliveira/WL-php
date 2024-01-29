// src/ApiTest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/pacientes');
                console.log(response.data); // Adicione esta linha
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>API Test</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <strong>ID:</strong> {item.id}, <strong>Nome:</strong> {item.nome_completo}, <strong>Exames:</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ApiTest;
