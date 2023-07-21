import { atom } from 'recoil';
import { DEFAULT_PROFILE_SCHEMA } from './constant';

export const profileState = atom({
    key: 'Home/profileState',
    default: DEFAULT_PROFILE_SCHEMA
})

export const uploadedProfileState = atom({
    key: 'Home/uploadedProfileState',
    default: false
})

export const pendingProfileState = atom({
    key: 'Home/pendingProfileState',
    default: null
})

