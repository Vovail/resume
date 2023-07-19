import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useRecoilValue } from 'recoil';
import { authEmailState, authPasswordState, firebaseAppState } from '../store';
import { useHistory } from 'react-router-dom';
import { AUTHENTICATED_ROUTES } from '~/Layout/constant';

const useSignIn = () => {
  const history = useHistory();
  const email = useRecoilValue(authEmailState);
  const password = useRecoilValue(authPasswordState);
  const firebaseApp = useRecoilValue(firebaseAppState);

  const login = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(getAuth(firebaseApp), email, password);
      console.log(userCredentials);
      history.push(`/${AUTHENTICATED_ROUTES.Home}`);
    } catch (error) {
      console.error(error);
    }
  }

  return login
}

export default useSignIn;