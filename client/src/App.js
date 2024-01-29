import React from 'react';
import RegistrationForm from './RegistrationForm';
import ExamForm from './ExamForm';

const App = () => {
  return (
    <div>
      <h1>Patient Registration</h1>
      <RegistrationForm />
      <h1>Exam Registration</h1>
      <ExamForm />
    </div>
  );
};

export default App;
