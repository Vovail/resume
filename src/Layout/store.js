import { atom } from 'recoil';
import { PAGES } from './constant';

export const headerTitleState = atom({
  key: 'Layout/headerTitleState',
  default: PAGES.Home,
});

export const isOpenDrawerState = atom({
  key: 'Layout/isOpenDrawerState',
  default: false,
});
