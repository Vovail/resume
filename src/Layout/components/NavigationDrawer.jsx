import React from 'react';
import { Drawer, makeStyles, List, ListItem, ListItemText } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { headerTitleState, isOpenDrawerState } from '../store';
import { DRAWER_WIDTH, PAGES } from '../constant';
import { capitalize } from '~/utils';

const useStyles = makeStyles(() => ({
  drawer: {
    width: DRAWER_WIDTH,
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

  return (
    <Drawer open={isOpen} variant="persistent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
      <List component="nav">
        {Object.values(PAGES).map((page) => (
          <ListItem
            selected={page === headerTitle}
            key={page}
            button={page !== headerTitle}
            component={page !== headerTitle ? Link : 'div'}
            to={page}
          >
            <ListItemText className={classes.menuItemLabel}>{page}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavigationDrawer;
