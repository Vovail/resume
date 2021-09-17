import { Box, Typography, LinearProgress, Link, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { MailOutline, PhoneAndroidOutlined, GitHub, LinkedIn, ContactSupport } from '@material-ui/icons';
import SkypeIcon from '~/components/SkypeIcon';

const mapper = {
  phone: PhoneAndroidOutlined,
  email: MailOutline,
  github: GitHub,
  linkedIn: LinkedIn,
  skype: SkypeIcon,
};

// eslint-disable-next-line react/prop-types
const ContactIcon = ({ name, ...rest }) => {
  const Icon = mapper[name] || ContactSupport;
  return <Icon {...rest} />;
};

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  aside: {
    width: 250,
    [breakpoints.down('xs')]: {
      order: 3,
      width: 'auto',
      margin: 0,
    },
  },
  photo: {
    borderRadius: '50%',
    maxWidth: '100%',
  },
  list: {
    padding: spacing(0, 0, 0, 1),
    margin: 0,
    listStyle: 'none',
  },
  skillProgress: {
    flex: '0 1 140px',
    [breakpoints.down('sm')]: {
      flex: '0 1 60%',
    },
  },
  contactValue: {
    wordBreak: 'break-all',
  },
}));

const CVAside = ({ photo, skills, contacts }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSMview = useMediaQuery('(min-width: 600px)');

  return (
    <Box p={2} className={classes.aside} component="aside" mr={1} bgcolor={theme.palette.grey[300]} position="relative">
      <Box position="sticky" top="100px">
        {isSMview && (
          <Box mb={2} display="flex" justifyContent="center">
            <img src={photo} alt="users photo" className={classes.photo} />
          </Box>
        )}
        {skills && (
          <Box mb={2}>
            <Typography variant="subtitle1">Skills</Typography>
            <Box component="ul" className={classes.list}>
              {skills.map((skill) => (
                <Box component="li" key={skill.name}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography component="div" variant="caption">
                      {skill.name}
                    </Typography>
                    <LinearProgress className={classes.skillProgress} variant="determinate" value={skill.level * 100} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {contacts && (
          <Box mb={2}>
            <Typography variant="subtitle1">Contacts</Typography>
            <Box component="ul" className={classes.list}>
              {contacts.map((contact) => (
                <Box component="li" key={contact.name}>
                  <Box display="flex" alignItems="center">
                    {/* <Box mr={1}>{getContactIcon(contact.name)}</Box> */}
                    <Box mr={1}>
                      <ContactIcon name={contact.name} />
                    </Box>
                    {contact.value && (
                      <Typography component="div" variant="caption" className={classes.contactValue}>
                        {contact.value}
                      </Typography>
                    )}
                    {contact.href && (
                      <Link href={contact.href} target="_blank">
                        <Typography component="div" variant="caption" className={classes.contactValue}>
                          {contact.href}
                        </Typography>
                      </Link>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

CVAside.propTypes = {
  photo: PropTypes.string,
  skills: PropTypes.array,
  contacts: PropTypes.array,
};

CVAside.defaultProps = {
  photo: '',
  skills: null,
  contacts: null,
};

export default CVAside;
