import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(<App />);
