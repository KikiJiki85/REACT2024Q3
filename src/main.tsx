import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter.tsx';

const element = document.getElementById('root')!;
const root = ReactDOM.createRoot(element);

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
