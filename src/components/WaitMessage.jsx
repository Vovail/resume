import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box, makeStyles, alpha } from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(palette.common.black, 0.2),
  },
}));

const WaitMessage = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <Box className={cx(classes.overlay, className)}>
      <Box color="secondary.main" fontSize={50} {...rest}>
        Please wait...
      </Box>
    </Box>
  );
};

WaitMessage.propTypes = {
  className: PropTypes.string,  
};

WaitMessage.defaultProps = {
  className: '',  
};

export default WaitMessage;
