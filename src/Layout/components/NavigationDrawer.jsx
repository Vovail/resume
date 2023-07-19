import React from 'react';
import { Drawer, makeStyles, List, ListItem, ListItemText } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { headerTitleState, isOpenDrawerState } from '../store';
import { DRAWER_WIDTH, AUTHENTICATED_ROUTES, PUBLIC_ROUTES, mapPageToRoute, mapRouteToPage, } from '../constant';
import { authenticatedUserState } from '~/Auth/store';

const useStyles = makeStyles(() => ({
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  menuItemLabel: {
    textTransform: 'capitalize',
  },
}));

const NavigationDrawer = () => {
  const classes = useStyles();
  const isOpen = useRecoilValue(isOpenDrawerState);
  const headerTitle = useRecoilValue(headerTitleState);
  const authenticatedUser = useRecoilValue(authenticatedUserState);

  return (
    <Drawer open={isOpen} variant="persistent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
      <List component="nav">
        {Object.values(authenticatedUser ? AUTHENTICATED_ROUTES : PUBLIC_ROUTES).map((route) => (
          <ListItem
            selected={route === mapPageToRoute[headerTitle]}
            key={route}
            button={route !== mapPageToRoute[headerTitle]}
            component={route !== headerTitle ? Link : 'div'}
            to={route}
          >
            <ListItemText className={classes.menuItemLabel}>{mapRouteToPage[route]}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavigationDrawer;
