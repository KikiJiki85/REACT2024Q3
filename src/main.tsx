import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter.tsx';
import 'normalize.css';
import { Provider } from 'react-redux';
import store from './store.ts';

const element = document.getElementById('root')!;
const root = ReactDOM.createRoot(element);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
);
