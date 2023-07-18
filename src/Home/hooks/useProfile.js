import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { pendingProfileState, profileState } from '../store';
import { userEmailState } from '~/store';

const useProfile = () => {
  const user = useRecoilValue(userEmailState);
  const setPending = useSetRecoilState(pendingProfileState);
  const [profile, setProfile] = useRecoilState(profileState);

  const getProfile = async () => {
    const db = getFirestore();
    const docRef = doc(db, 'users', user);

    try {
      setPending(true);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
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
    user && !profile && getProfile();
  }, [user, profile]);

  return profile;
};
export default useProfile;
