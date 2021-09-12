import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useApiClient from '~/hooks/useApiClient';
import { pendingProfileState, profileState } from '../store';

const useProfile = () => {
  const apiClient = useApiClient();
  const setPending = useSetRecoilState(pendingProfileState);
  const [profile, setProfile] = useRecoilState(profileState);

  const getProfile = async () => {
    try {
      setPending(true);
      const { data } = await apiClient.get('assets/profile.json');
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return profile;
};
export default useProfile;
