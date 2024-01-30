import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import '../styles.css';

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
        <Container component="main" maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Code"
                            name="codigo"
                            value={examData.codigo}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="descricao"
                            value={examData.descricao}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Value"
                            name="valor"
                            value={examData.valor}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Enviar Exame
                </Button>
            </form>
        </Container>
    );
};

export default ExamForm;
