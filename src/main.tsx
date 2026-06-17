import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import muiTheme from './theme/muiTheme.ts';
import { TodoProvider } from './context/TodoContext.tsx';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <TodoProvider>
          <App />
        </TodoProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
});
