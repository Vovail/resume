import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-ui/core';
import { RecoilRoot } from 'recoil';
import theme from './theme';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>  
);
