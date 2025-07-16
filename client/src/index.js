import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { PanelProvider } from './contexts/PanelContext';
import { AuthProvider } from './contexts/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PanelProvider>
        <App />
      </PanelProvider>
    </AuthProvider>
  </React.StrictMode>
); 