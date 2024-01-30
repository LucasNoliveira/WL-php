// components/RegistrationForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

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

            const responseData = await response.text();
            console.log('Response:', responseData);

            if (response.ok) {
                const data = JSON.parse(responseData);
                console.log('Patient registered successfully:', data);
                // Handle success
            } else {
                console.error('Failed to register patient');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nome Completo"
                            name="nome_completo"
                            value={formData.nome_completo}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Gênero</InputLabel>
                            <Select
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleInputChange}
                                label="Gênero"
                            >
                                <MenuItem value="">
                                    Selecione o seu Gênero
                                </MenuItem>
                                <MenuItem value="male">Masculino</MenuItem>
                                <MenuItem value="female">Feminino</MenuItem>
                                <MenuItem value="other">Outro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Celular"
                            name="celular"
                            value={formData.celular}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default RegistrationForm;
