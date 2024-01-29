import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';
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
    <div>
      {showPatientForm && (
        <div>
          <h1>Registro de Pacientes</h1>
          <Form />
        </div>
      )}

      {showExamForm && (
        <div>
          <h1>Registro de Exames</h1>
          <ExamForm />
        </div>
      )}

      {!showExamForm && (
        <button onClick={handleExamLinkClick}>Clique para registrar um exame</button>
      )}

      {!showPatientForm && (
        <button onClick={handlePatientLinkClick}>Clique para registrar um paciente</button>
      )}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
