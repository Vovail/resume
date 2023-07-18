import React, { useEffect, useMemo, useRef } from 'react';
import { Box, Typography, Paper, Divider, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
import Loader from '~/components/Loader';
import CVAside from './CVAside';
import CVWorkExperience from './CVWorkExperience';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cvRefState, isFileDownloadingState } from '../store';
import WaitMessage from '~/components/WaitMessage';

const useStyles = makeStyles(({ spacing, typography, breakpoints }) => ({
  paper: {
    padding: spacing(2),
    marginBottom: spacing(2),
  },
  mb: {
    marginBottom: spacing(2),
  },
  photo: {
    borderRadius: '50%',
    maxWidth: '200px',
  },
  title: {
    fontWeight: typography.fontWeightBold,
    marginBottom: spacing(1),
  },
  verticalDivider: {
    margin: spacing(0, 2),
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  fixPosition: {
    position: 'fixed',
  },
}));

const CV = ({ profile }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSMview = useMediaQuery('(min-width: 600px)');
  const isMDview = useMediaQuery('(min-width: 960px)');
  const cvRef = useRef();
  const setCvRefState = useSetRecoilState(cvRefState);
  const isFileDownloading = useRecoilValue(isFileDownloadingState);
  const { firstName, secondName, position, skills, photo, contacts, summary, experience, languages } = useMemo(
    () => profile || {},
    [profile],
  );

  useEffect(() => {
    if (cvRef.current) {
      setCvRefState(cvRef.current);
    }
  }, [profile]);

  if (!profile) {
    return <Loader display="flex" alignItems="center" justifyContent="center" height={100} />;
  }

  return (
    <Box>
      {isFileDownloading && <WaitMessage className={classes.fixPosition} />}
      <div ref={cvRef}>
        <Box display="flex" flexDirection={isSMview ? 'row' : 'column'} alignItems="stretch">
          {!isSMview && (
            <Box mb={2} display="flex" justifyContent="center" className="hide-for-print">
              <img src={photo} alt="users photo" className={classes.photo} />
            </Box>
          )}
          <CVAside photo={photo} skills={skills} contacts={contacts} />
          <Box display="flex" flexDirection="column" flex="1" bgcolor={theme.palette.grey[100]} p={2}>
            <Paper component="header" className={classes.paper} elevation={0}>
              <Typography variant="h4">
                {firstName} {secondName}
              </Typography>
              <Typography variant="subtitle1">{position}</Typography>
            </Paper>
            <Box flex="1">
              <Paper component="section" className={classes.paper} elevation={0}>
                {summary}
              </Paper>
              <CVWorkExperience experience={experience} />
              <Paper component="section" className={classes.paper} elevation={0}>
                <Typography variant="h6" className={classes.title}>
                  Languages
                </Typography>
                <Box display="flex" flexDirection={isMDview ? 'row' : 'column'}>
                  {languages.map((item, i) => (
                    <React.Fragment key={item.language}>
                      <Box mb={1} minWidth="100px">
                        <Typography>{item.language}</Typography>
                        <Typography variant="caption">{item.level}</Typography>
                      </Box>
                      {i + 1 < languages.length && <Divider className={classes.verticalDivider} orientation="vertical" flexItem />}
                    </React.Fragment>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </div>
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
