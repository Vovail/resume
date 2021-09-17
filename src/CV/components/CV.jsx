import { Box, Typography, Paper, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import CVAside from './CVAside';
import CVWorkExperience from './CVWorkExperience';

const useStyles = makeStyles(({ spacing }) => ({
  paper: {
    padding: spacing(2),
    marginBottom: spacing(2),
  },
  mb: {
    marginBottom: spacing(2),
  },
  photo: {
    borderRadius: '50%',
    maxWidth: '100%',
  },
}));

const CV = ({ profile }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSMview = useMediaQuery('(min-width: 600px)');
  const { firstName, secondName, position, skills, photo, contacts, summary, expirience } = useMemo(() => profile || {}, [profile]);

  if (!profile) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height={100}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection={isSMview ? 'row' : 'column'} alignItems="stretch">
      {!isSMview && (
        <Box mb={2} display="flex" justifyContent="center">
          <img src={photo} alt="users photo" className={classes.photo} />
        </Box>
      )}
      <CVAside photo={photo} skills={skills} contacts={contacts} />
      <Box display="flex" flexDirection="column" flex="1" bgcolor={theme.palette.grey[100]} p={2}>
        <Paper component="header" className={classes.paper}>
          <Typography variant="h4">
            {firstName} {secondName}
          </Typography>
          <Typography variant="subtitle1">{position}</Typography>
        </Paper>
        <Box flex="1">
          <Paper component="section" className={classes.paper}>
            {summary}
          </Paper>
          <CVWorkExperience experience={expirience} />
        </Box>
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
