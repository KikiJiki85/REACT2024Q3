import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import App from './App';
import NotFound from './components/NotFound/NotFound';
import ItemDetails from './components/ItemDetails/ItemDetails';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';

const AppRouter: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/search/1" />} />
          <Route path="/search/:page" element={<App />}>
            <Route path="details/:id" element={<ItemDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
