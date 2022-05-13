import React from 'react';
import { render, createRoot } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
