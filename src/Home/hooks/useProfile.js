import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { pendingProfileState, profileState, uploadedProfileState } from '../store';
import { authenticatedUserState } from '~/Auth/store';

const useProfile = () => {
  const user = useRecoilValue(authenticatedUserState);
  const setPending = useSetRecoilState(pendingProfileState);
  const [uploadedProfile, setUploadedProfile] = useRecoilState(uploadedProfileState);
  const [profile, setProfile] = useRecoilState(profileState);

  const getProfile = async () => {
    const db = getFirestore();
    const docRef = doc(db, 'users', user);

    try {
      setPending(true);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
        setUploadedProfile(true);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    user && !uploadedProfile && getProfile();
  }, [user, uploadedProfile]);

  return profile;
};
export default useProfile;
