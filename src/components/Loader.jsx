import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box, CircularProgress, makeStyles, alpha } from '@material-ui/core';

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

const Loader = ({ overlay, size, className, progressProps, ...rest }) => {
  const classes = useStyles();
  return (
    <Box className={cx(overlay && classes.overlay, className)} {...rest}>
      <CircularProgress size={size} color="secondary" {...progressProps} />
    </Box>
  );
};

Loader.propTypes = {
  overlay: PropTypes.bool,
  size: PropTypes.number,
  className: PropTypes.string,
  progressProps: PropTypes.any,
};

Loader.defaultProps = {
  overlay: false,
  size: 40,
  className: '',
  progressProps: {},
};

export default Loader;
