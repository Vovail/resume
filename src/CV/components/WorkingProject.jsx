import { Box, Typography, Divider, makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { formatDateForPeriod } from '~/utils';

const useStyles = makeStyles(({ spacing, typography, palette }) => ({
  fontWeightBold: {
    fontWeight: typography.fontWeightBold,
  },
  timePeriod: {
    color: palette.text.secondary,
  },
  projectName: {
    fontStyle: 'italic',
  },
  divider: {
    margin: spacing(2, 0),
  },
  description: {
    margin: spacing(1, 0),
  },
}));

const WorkingProject = ({ project, shortView }) => {
  const classes = useStyles();

  return (
    <Box component="article" mb={2}>
      <Typography variant="subtitle1" className={classes.projectName}>
        {project.name}
      </Typography>
      <Typography variant="caption" className={classes.timePeriod}>{`${formatDateForPeriod(
        project.timePeriod.from,
      )} - ${formatDateForPeriod(project.timePeriod.to)}`}</Typography>
      {!shortView && (
        <>
          <Typography className={classes.description}>{project.description}</Typography>
          <Box>
            <Typography variant="caption" className={classes.fontWeightBold}>
              Responsibilities:{' '}
            </Typography>
            <Typography variant="caption">{project.responsibilities}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" className={classes.fontWeightBold}>
              Team Size:{' '}
            </Typography>
            <Typography variant="caption">{project.teamSize}</Typography>
          </Box>
        </>
      )}
      <Box>
        <Typography variant="caption" className={classes.fontWeightBold}>
          Technologies:{' '}
        </Typography>
        <Typography variant="caption">{project.technologies.join(', ')}.</Typography>
      </Box>
      <Divider className={classes.divider} />
    </Box>
  );
};

WorkingProject.propTypes = {
  project: PropTypes.shape(),
  shortView: PropTypes.bool,
};

WorkingProject.defaultProps = {
  project: null,
  shortView: false,
};

export default WorkingProject;
