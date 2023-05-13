import { createTheme } from '@material-ui/core';

export default createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          '@media print': {
            '& .hide-for-print': {
              display: 'none !important',
            },
          },
        },
      },
    },
  },
});
