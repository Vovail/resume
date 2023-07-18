import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { pendingSaveProfileState } from '../store';
import { userEmailState } from '~/store';

const useSaveProfile = () => {
  const user = useRecoilValue(userEmailState);
  const setPending = useSetRecoilState(pendingSaveProfileState);  

  const saveProfile = async (profile) => {
    const db = getFirestore();
    const docRef = doc(db, 'users', user);

    try {
      setPending(true);
      await setDoc(docRef, profile);      
    } catch (error) {
      console.error(error);
      throw error
    } finally {
      setPending(false);
    }
  };

  return saveProfile;
};
export default useSaveProfile;
