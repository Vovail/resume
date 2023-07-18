import { atom } from 'recoil';

export const profileState = atom({
    key: 'Home/profileState',
    default: null
})

export const pendingProfileState = atom({
    key: 'Home/pendingProfileState',
    default: null
})
