// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Nav from './Components/Nav.jsx';
import App from './App.jsx';
import './index.css';

const headerElement = document.getElementById('header');
const contentElement = document.getElementById('content');

if (headerElement) {
  createRoot(headerElement).render(
    <StrictMode>
      <Nav />
    </StrictMode>
  );
} else {
  console.error("Header element not found");
}

if (contentElement) {
  createRoot(contentElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Content element not found");
}
