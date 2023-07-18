import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { RecoilRoot } from 'recoil';
import theme from './theme';
import App from './App';

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('app'),
);
