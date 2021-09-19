import { Box } from '@material-ui/core';
import React from 'react';
import useTitle from '~/hooks/useTitle';
import { PAGES } from '~/Layout/constant';

const ResumeList = () => { 

  useTitle(PAGES.ResumeList)

  return <Box>{PAGES.ResumeList} page TBD...</Box>;
};

export default ResumeList;
