import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, CssBaseline, Container, Typography } from '@mui/material';
import RegistrationForm from './components/Form';
import ExamForm from './components/ExamForm';
import './styles.css';

const App = () => {
  const [showPatientForm, setShowPatientForm] = useState(true);
  const [showExamForm, setShowExamForm] = useState(false);

  const handleExamLinkClick = () => {
    setShowPatientForm(false);
    setShowExamForm(true);
  };

  const handlePatientLinkClick = () => {
    setShowExamForm(false);
    setShowPatientForm(true);
  };

  return (
    <Container component="main" maxWidth="sm" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', padding: '3rem', gap:'1rem' }}>
      <CssBaseline />
      <Typography variant="h4" color="primary" gutterBottom>
        {showPatientForm ? 'Registro de Pacientes' : 'Registro de Exames'}
      </Typography>
      {showPatientForm && <RegistrationForm />}
      {showExamForm && <ExamForm />}
      {!showExamForm && (
        <Button onClick={handleExamLinkClick} variant="contained" color="primary" fullWidth>
          Clique para registrar um exame
        </Button>
      )}
      {!showPatientForm && (
        <Button onClick={handlePatientLinkClick} variant="contained" color="secondary" fullWidth>
          Clique para registrar um paciente
        </Button>
      )}
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
