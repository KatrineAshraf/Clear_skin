import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Nav from './Components/Nav.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('content')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
createRoot(document.getElementById('header')).render(
  <StrictMode>
    <Nav />
  </StrictMode>
);
