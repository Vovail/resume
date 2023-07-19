import { signOut, getAuth } from 'firebase/auth';
import { useRecoilValue } from 'recoil';
import { firebaseAppState } from '../store';
import { useHistory } from 'react-router-dom';
import { PUBLIC_ROUTES } from '~/Layout/constant';

const useSignOut = () => {
  const history = useHistory();
  const firebaseApp = useRecoilValue(firebaseAppState);

  const logout = async () => {
    try {
      await signOut(getAuth(firebaseApp));
      history.push(`/${PUBLIC_ROUTES.Login}`);
    } catch (error) {
      console.error(error);
    }
  }

  return logout
}

export default useSignOut;