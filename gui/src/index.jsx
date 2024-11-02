import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import './index.css';

const root = createRoot(document.body);
root.render(<App />);