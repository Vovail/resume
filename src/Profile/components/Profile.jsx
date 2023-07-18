import { Box } from '@material-ui/core';
import React from 'react';
import { useRecoilState } from 'recoil';
import useTitle from '~/hooks/useTitle';
import JSONEditor from '~/components/JSONEditor';
import { PAGES } from '../../Layout/constant';
import { profileState } from '~/Home/store';
import useSaveProfile from '../hooks/useSaveProfile';

const Profile = () => {
  const [profile, setProfile] = useRecoilState(profileState)
  const saveProfile = useSaveProfile();

  useTitle(PAGES.Profile)

  const onSubmit = async (value) => {
    try {
      await saveProfile(value);
      setProfile(value);
    } catch { /* empty */ }
  }

  return <Box flex={1}>
    <JSONEditor value={profile} onSubmit={onSubmit} />
  </Box>;
};

export default Profile;
