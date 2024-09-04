import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import i18n from '../i18n/index.ts';
import App from './App.tsx';
import './index.css';
import { I18nextProvider } from 'react-i18next';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
    <App />
    </I18nextProvider>
  </StrictMode>,
)
