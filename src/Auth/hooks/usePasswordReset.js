import { sendPasswordResetEmail, confirmPasswordReset, getAuth } from 'firebase/auth';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';
import { firebaseAppState } from '../store';
import { PUBLIC_ROUTES } from '~/Layout/constant';

const usePasswordReset = () => {
  const history = useHistory();
  const firebaseApp = useRecoilValue(firebaseAppState);

  const passwordReset = async (email) => {
    await sendPasswordResetEmail(getAuth(firebaseApp), email)

  }

  const confirmThePasswordReset = async (oobCode, newPassword) => {
    if (!oobCode || !newPassword) return;

    await confirmPasswordReset(getAuth(firebaseApp), oobCode, newPassword)
    history.push(`/${PUBLIC_ROUTES.Login}`);
  }

  return { passwordReset, confirmPasswordReset: confirmThePasswordReset }
}

export default usePasswordReset;