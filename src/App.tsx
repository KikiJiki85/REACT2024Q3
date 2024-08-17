import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UncontrolledForm from './routes/UncontrolledForm';
import ControlledForm from './routes/HookForm';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        <Link to="/controlled-form">Controlled Form</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/controlled-form" element={<ControlledForm />} />
      </Routes>
    </Router>
  );
};

const Home: React.FC = () => (
  <div>
    <h1>Welcome to the Form App</h1>
    <p>Select a form to fill out.</p>
  </div>
);

export default App;
