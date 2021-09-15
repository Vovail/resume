import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Container, Box, makeStyles } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';
import NavigationDrawer from './NavigationDrawer';
import { DRAWER_WIDTH } from '../constant';
import { useRecoilValue } from 'recoil';
import { isOpenDrawerState } from '../store';

const useStyles = makeStyles(({ spacing, transitions, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    transition: transitions.create(['padding'], {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
  },
  drawerSpace: {
    paddingLeft: DRAWER_WIDTH + spacing(3),
  },
  // main: {
  //   backgroundColor: palette.grey[200],
  // },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const isDrawerOpen = useRecoilValue(isOpenDrawerState);

  return (
    <Container fixed className={cx(classes.container, isDrawerOpen && classes.drawerSpace)}>
      <Header />

      <Box component="main" flex="1" className={classes.main}>
        <NavigationDrawer />
        {children}
      </Box>
      <Footer />
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
