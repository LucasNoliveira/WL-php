import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
} from '@mui/material';

const ExamForm = () => {
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    valor: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage('');
    setSuccessMessage('');
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Verificar se algum campo está vazio
    const emptyField = Object.keys(formData).find((key) => formData[key].trim() === '');

    if (emptyField) {
      setErrorMessage(`${emptyField.replace('_', ' ')} não pode estar vazio.`);
      return;
    }

    try {
      const response = await postData('http://127.0.0.1:8000/api/cadastrar-exame', formData);

      if (response.ok) {
        const data = await response.json();
        console.log('Exam registered successfully:', data);
        setSuccessMessage(`Exame ${formData.descricao} cadastrado com sucesso.`);
        // Limpar o formulário após o sucesso, se desejado
        setFormData({
          codigo: '',
          descricao: '',
          valor: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to register exam:', errorData.message);
        setErrorMessage(
          'Verifique se o exame cadastrado já existe ou se existe outro com o mesmo código.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(
        'Ocorreu um erro ao processar a solicitação. Verifique se o exame cadastrado já existe, ou se existe outro com o mesmo código. Por favor, tente novamente.'
      );
    }
  };

  const postData = async (url, data) => {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const styles = {
    errorText: { marginTop: '10px', color: 'red' },
    successText: { marginTop: '10px', color: 'green' },
    submitButton: { marginTop: '20px' },
  };

  return (
    <Container component="main" maxWidth="sm">
      <form onSubmit={submitForm}>
        <Grid container spacing={2}>
          {['codigo', 'descricao', 'valor'].map((fieldName) => (
            <Grid item xs={12} key={fieldName}>
              <TextField
                fullWidth
                label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleFieldChange}
              />
            </Grid>
          ))}
        </Grid>
        {errorMessage && (
          <Typography style={styles.errorText}>{errorMessage}</Typography>
        )}
        {successMessage && (
          <Typography style={styles.successText}>{successMessage}</Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={styles.submitButton}
        >
          Enviar Exame
        </Button>
      </form>
    </Container>
  );
};

export default ExamForm;
