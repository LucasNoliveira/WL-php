import React, { useState } from 'react';
import '../styles.css';


const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        nome_completo: '',
        sexo: '',
        email: '',
        celular: '',
    });
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/cadastrar-paciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Patient registered successfully:', data);
                // You can update the UI or redirect the user after successful registration
            } else {
                console.error('Failed to register patient');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Full Name:
                <input
                    type="text"
                    name="nome_completo"
                    value={formData.nome_completo}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Gender:
                <input
                    type="text"
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Phone:
                <input
                    type="text"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default RegistrationForm;
