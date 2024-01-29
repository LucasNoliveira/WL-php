// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
// import ApiTest from './ApiTest';
import Form from './components/Form';
import ExamForm from './components/ExamForm';


ReactDOM.render(
  <React.StrictMode>
    <Form  />
    <ExamForm  />
  </React.StrictMode>,
  document.getElementById('root')
);
