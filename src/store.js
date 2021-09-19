import { atom } from 'recoil';

export const userEmailState = atom({
  key: 'App/userEmailState',
  default: 'v.ilemsky@gmail.com',
});
