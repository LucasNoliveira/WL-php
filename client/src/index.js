import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, CssBaseline, Container, Typography } from '@mui/material';
import RegistrationForm from './components/Form';
import ExamForm from './components/ExamForm';
import './styles.css';

const App = () => {
  const [showPatientForm, setShowPatientForm] = useState(true);
  const [showExamForm, setShowExamForm] = useState(false);

  const handleFormToggle = () => {
    setShowPatientForm(!showPatientForm);
    setShowExamForm(!showExamForm);
  };

  const buttonStyle = {
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
  };

  return (
    <Container component="main" maxWidth="sm" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', padding: '3rem', gap: '1rem' }}>
      <CssBaseline />
      <Typography variant="h4" color="primary" gutterBottom>
        {showPatientForm ? 'Registro de Pacientes' : 'Registro de Exames'}
      </Typography>
      {showPatientForm ? <RegistrationForm /> : <ExamForm />}
      <Button onClick={handleFormToggle} {...buttonStyle}>
        {showPatientForm ? 'Clique para registrar um exame' : 'Clique para registrar um paciente'}
      </Button>
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
