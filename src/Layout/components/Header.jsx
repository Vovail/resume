import React from 'react';
import cx from 'classnames';
import { AppBar, Toolbar, Typography, IconButton, Box, makeStyles, useMediaQuery, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerTitleState, isOpenDrawerState } from '../store';
import { DRAWER_WIDTH, PAGES } from '../constant';
import { capitalize } from '~/utils';
import DownloadMenu from './DownloadMenu';
import useSignOut from '~/Auth/hooks/useSignOut';
import { authenticatedUserState } from '~/Auth/store';
import useUserReset from '~/Auth/hooks/useUserReset';

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
  const authenticatedUser = useRecoilValue(authenticatedUserState);
  const [isDrawerOpen, setIsDrawerOpen] = useRecoilState(isOpenDrawerState);
  const printView = useMediaQuery('print');
  const signOut = useSignOut();
  const reset = useUserReset();

  const handleLogOut = async () => {
    await signOut();
    reset();
  }

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
          <Box marginLeft="auto" display='flex'>
            {headerTitle === PAGES.Home && <DownloadMenu />}
            {!!authenticatedUser && <Tooltip title="Sign out">
              <IconButton color="inherit" aria-label="open drawer" onClick={handleLogOut} edge="start" className={cx(classes.menuButton)}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>}
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar className={cx(classes.mb, printView && classes.printHide)} />
    </>
  );
};

export default Header;
