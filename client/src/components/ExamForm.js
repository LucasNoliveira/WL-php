import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import '../styles.css';

const ExamForm = () => {
    const [examData, setExamData] = useState({
        codigo: '',
        descricao: '',
        valor: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExamData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear error message when input changes
        setErrorMessage('');
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
                const errorData = await response.json();
                console.error('Failed to register exam:', errorData.message);
                setErrorMessage('Verifique se o exame cadastrado já existe ou se existe outro com o mesmo código.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Ocorreu um erro ao processar a solicitação. Verifique se o exame cadastrado já existe, ou se existe outro com o mesmo código. Por favor, tente novamente.');
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Código"
                            name="codigo"
                            value={examData.codigo}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Descrição"
                            name="descricao"
                            value={examData.descricao}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Valor"
                            name="valor"
                            value={examData.valor}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                {errorMessage && (
                    <Typography color="error" style={{ marginTop: '10px' }}>
                        {errorMessage}
                    </Typography>
                )}
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Enviar Exame
                </Button>
            </form>
        </Container>
    );
};

export default ExamForm;
