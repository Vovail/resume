import { Box, Typography, makeStyles, useTheme } from '@material-ui/core';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import CVAside from './CVAside';

// const useStyles = makeStyles(() => ({
//   cvHeader: {
//     display: 'flex',
//     height: 50,
//     alignItems: 'center',
//   },
//   aside: {
//     width: 200,
//   },
// }));

const CV = ({ profile }) => {
  // const classes = useStyles();
  const theme = useTheme();
  const { firstName, secondName, position, skills, photo, contacts } = useMemo(() => profile || {}, [profile]);

  if (!profile) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height={100}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="stretch">
      <CVAside photo={photo} skills={skills} contacts={contacts} />
      <Box display="flex" flexDirection="column" flex="1">
        <Box component="header" mb={2} px={1} py={2} bgcolor={theme.palette.grey[100]}>
          <Typography variant="h4">
            {firstName} {secondName}
          </Typography>
          <Typography variant="subtitle1">{position}</Typography>
        </Box>
        <Box bgcolor={theme.palette.grey[100]} flex="1"></Box>
      </Box>
    </Box>
  );
};

CV.propTypes = {
  profile: PropTypes.shape(),
};

CV.defaultProps = {
  profile: null,
};

export default CV;
