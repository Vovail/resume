import { atom } from 'recoil';

export const firebaseAppState = atom({
  key: 'Auth/firebaseAppState',
  default: null,
});

export const firebaseAuthState = atom({
  key: 'Auth/firebaseAuthState',
  default: null,
});

export const authEmailState = atom({
  key: 'Auth/authEmailState',
  default: '',
});

export const authPasswordState = atom({
  key: 'Auth/authPasswordState',
  default: '',
});

export const resetPasswordCodeState = atom({
  key: 'Auth/resetPasswordCodeState',
  default: '',
});

export const sendResetPasswordCodeState = atom({
  key: 'Auth/sendResetPasswordCodeState',
  default: false,
});

export const authenticatedUserState = atom({
  key: 'Auth/authenticatedUserState',
  default: null,
});


