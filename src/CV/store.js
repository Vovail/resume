import { atom } from 'recoil';

export const workExperienceShortViewState = atom({
  key: 'CV/workExperienceShortViewState',
  default: false,
});

export const cvRefState = atom({
  key: 'CV/cvRefState',
  default: null,
});
