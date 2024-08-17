import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Main: React.FC = () => {
  const formData = useSelector((state: RootState) => state.forms);

  return (
    <div>
      <h1>Main page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/uncontrolled-form">
              Uncontrolled components approach form
            </Link>
          </li>
          <li>
            <Link to="/hook-form">Form with the use of React Hook Form</Link>
          </li>
        </ul>
      </nav>
      <div>
        <h2>Data from forms:</h2>
        {Object.keys(formData).map(key => (
          <div key={key}>
            <h3>{key}</h3>
            <pre>{JSON.stringify(formData[key], null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
