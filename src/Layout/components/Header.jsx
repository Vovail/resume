import React from 'react';
import cx from 'classnames';
import { AppBar, Toolbar, Typography, IconButton, Box, makeStyles, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerTitleState, isOpenDrawerState } from '../store';
import { DRAWER_WIDTH, PAGES } from '../constant';
import { capitalize } from '~/utils';
import DownloadMenu from './DownloadMenu';

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  mb: {
    marginBottom: theme.spacing(2),
  },
  printHide: {
    display: 'none',
  },
  downloadBtn: {
    marginLeft: 'auto',
  },
}));

const Header = () => {
  const classes = useStyles();
  const headerTitle = useRecoilValue(headerTitleState);
  const [isDrawerOpen, setIsDrawerOpen] = useRecoilState(isOpenDrawerState);
  const printView = useMediaQuery('print');

  const handleDrawerOpen = () => {
    setIsDrawerOpen((state) => !state);
  };

  return (
    <>
      <AppBar
        className={cx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
          [classes.printHide]: printView,
        })}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={cx(classes.menuButton)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{capitalize(headerTitle)}</Typography>
          <Box marginLeft="auto">{headerTitle === PAGES.Home && <DownloadMenu />}</Box>
        </Toolbar>
      </AppBar>

      <Toolbar className={classes.mb} />
    </>
  );
};

export default Header;
