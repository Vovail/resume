import { Box } from '@material-ui/core';
import React from 'react';
import useTitle from '~/hooks/useTitle';
import { PAGES } from '../../Layout/constant';

const Profile = () => { 

  useTitle(PAGES.Profile)

  return <Box>{PAGES.Profile} page TBD...</Box>;
};

export default Profile;
