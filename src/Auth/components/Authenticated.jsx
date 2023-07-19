import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authenticatedUserState, firebaseAppState } from '../store';
import { useHistory } from 'react-router-dom';
import { PUBLIC_ROUTES } from '~/Layout/constant';

const Authenticated = ({ children }) => {
  const history = useHistory();
  const firebaseApp = useRecoilValue(firebaseAppState);
  const [authenticatedUser, setAuthenticatedUserState] = useRecoilState(authenticatedUserState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(firebaseApp), (user) => {
      if (user) {
        setAuthenticatedUserState(user.email);
      } else {
        setAuthenticatedUserState(null);
        history.push(`/${PUBLIC_ROUTES.Login}`);
      }
    })

    return () => {
      unsubscribe && unsubscribe();
    }
  }, [])


  return authenticatedUser && children;
}

export default React.memo(Authenticated);