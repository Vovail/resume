import { Box } from '@material-ui/core';
import React from 'react';
import useProfile from '../hooks/useProfile';
import useTitle from '~/hooks/useTitle';
import CV from '~/CV/components/CV';
import { PAGES } from '../../Layout/constant';

const Home = () => {
  const profile = useProfile();
  
  useTitle(PAGES.Home);

  return (
    <Box>
      <CV profile={profile} />
    </Box>
  );
};

export default Home;
