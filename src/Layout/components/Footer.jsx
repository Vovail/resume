import { Box } from '@material-ui/core';
import React from 'react';

const Footer = () => {  
  return (
    <Box mt="auto" component="footer" textAlign="center" py={1} displayPrint="none">
      {(new Date().getFullYear())}
    </Box>
  );
};

export default Footer;
