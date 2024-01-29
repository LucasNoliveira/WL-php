import React, { useState } from 'react';

const ExamForm = () => {
    const [examData, setExamData] = useState({
        codigo: '',
        descricao: '',
        valor: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExamData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/cadastrar-exame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(examData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Exam registered successfully:', data);
                // You can update the UI or redirect the user after successful registration
            } else {
                console.error('Failed to register exam');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Code:
                <input
                    type="text"
                    name="codigo"
                    value={examData.codigo}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Description:
                <input
                    type="text"
                    name="descricao"
                    value={examData.descricao}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Value:
                <input
                    type="text"
                    name="valor"
                    value={examData.valor}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ExamForm;
