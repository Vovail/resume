import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box, Typography, Paper, makeStyles, Button } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { formatDateForPeriod } from '~/utils';
import WorkingProject from './WorkingProject';
import { workExperienceShortViewState } from '../store';
import { PDF_BLOCK_CLASS_NAME } from '~/constants';

const useStyles = makeStyles(({ spacing, typography, palette }) => ({
  wrapper: {
    position: 'relative',
    marginBottom: spacing(2),
    padding: spacing(2),
  },
  title: {
    fontWeight: typography.fontWeightBold,
    marginBottom: spacing(1),
  },
  timePeriod: {
    display: 'block',
    color: palette.text.secondary,
    marginBottom: spacing(2),
  },
  fontBold: {
    fontWeight: typography.fontWeightBold,
  },
  subtitle: {
    fontWeight: typography.fontWeightBold,
  },
  switchButton: {
    position: 'absolute',
    top: spacing(2),
    right: spacing(2),
  },
}));

const CVWorkExperience = ({ experience }) => {
  const classes = useStyles();
  const [workExperienceShortView, setWorkExperienceShortView] = useRecoilState(workExperienceShortViewState);

  return (
    <Paper component="section" mb={2} className={classes.wrapper} elevation={0}>
      <Button
        className={cx(classes.switchButton, 'hide-for-print')}
        size="small"
        variant="outlined"
        onClick={() => {
          setWorkExperienceShortView((state) => !state);
        }}
      >
        {workExperienceShortView ? 'Show Details' : 'Hide Details'}
      </Button>
      <Typography variant="h6" className={cx(PDF_BLOCK_CLASS_NAME, classes.title)}>
        Experience
      </Typography>
      {!experience && <>Work Experience data is not available</>}
      {experience &&
        experience.map((work, index) => (
          <Box key={work.company + index} mb={2}>
            <Typography variant="subtitle1" className={cx(PDF_BLOCK_CLASS_NAME, classes.fontBold)}>
              {work.company}
            </Typography>
            <Typography variant="caption" className={cx(PDF_BLOCK_CLASS_NAME, classes.timePeriod)}>{`${formatDateForPeriod(
              work.timePeriod.from,
            )} - ${formatDateForPeriod(work.timePeriod.to)}`}</Typography>
            <Box pl={2}>
              <Typography variant="subtitle1" className={cx(PDF_BLOCK_CLASS_NAME, classes.subtitle)} >
                Projects:
              </Typography>
              {work.projects.map((project) => (
                <WorkingProject key={project.timePeriod.from} project={project} shortView={workExperienceShortView} className={PDF_BLOCK_CLASS_NAME} />
              ))}
            </Box>
          </Box>
        ))}
    </Paper>
  );
};

CVWorkExperience.propTypes = {
  experience: PropTypes.array,
};

CVWorkExperience.defaultProps = {
  experience: null,
};

export default CVWorkExperience;
