import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './routes/Main';
import UncontrolledForm from './routes/UncontrolledForm';
import HookForm from './routes/HookForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/hook-form" element={<HookForm />} />
      </Routes>
    </Router>
  );
};

export default App;
