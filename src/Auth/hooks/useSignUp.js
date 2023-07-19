import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';
import { authEmailState, authPasswordState, firebaseAppState } from '../store';
import { PUBLIC_ROUTES } from '~/Layout/constant';

const useSignUp = () => {
  const history = useHistory();
  const email = useRecoilValue(authEmailState);
  const password = useRecoilValue(authPasswordState);
  const firebaseApp = useRecoilValue(firebaseAppState);

  const signUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(getAuth(firebaseApp), email, password);
      console.log(userCredentials);
      history.push(`/${PUBLIC_ROUTES.Login}`);
    } catch (error) {
      console.error(error)
    }
  }

  return signUp
}

export default useSignUp;