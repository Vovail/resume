import { Box } from '@material-ui/core';
import React from 'react';
import useProfile from '../hooks/useProfile';
import useTitle from '~/hooks/useTitle';
import { PAGES } from '../../Layout/constant';

const Home = () => {
  const profile = useProfile();

  useTitle(PAGES.Home)

  return <Box>{profile ? JSON.stringify(profile) : 'loading...'}</Box>;
};

export default Home;
