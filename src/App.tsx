import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UncontrolledForm from './routes/UncontrolledForm';
import ControlledForm from './routes/HookForm';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { FormState } from './store/formSlice';

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

const Home: React.FC = () => {
  const formData = useSelector((state: RootState) => state.forms);
  return (
    <div>
      <h1>Welcome to the Form App</h1>
      <p>Select a form to fill out.</p>
      <div>
        <h2>Form data:</h2>
        {Object.keys(formData).map(key => (
          <div key={key}>
            <h3>{key}</h3>
            <pre>
              {JSON.stringify(formData[key as keyof FormState], null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
