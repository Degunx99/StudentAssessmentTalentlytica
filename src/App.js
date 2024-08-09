import React from 'react';
import Header from './components/Header';
import AssessmentTable from './elements/penilaian/AssessmentTable';
import './Styles.scss';

function App() {
  return (
    <div className="app-container">
      <div className="body">
        <Header />
        <AssessmentTable />
      </div>
    </div>
  );
}

export default App;
