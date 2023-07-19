import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { useSetRecoilState } from 'recoil';
import { firebaseAppState } from '../store';

const useConfigure = () => {
  const [configured, setConfigured] = useState(false);
  const setFirebaseApp = useSetRecoilState(firebaseAppState);

  useEffect(() => {
    const app = initializeApp({
      apiKey: process.env.FIRESTORE_API_KEY,
      authDomain: process.env.FIRESTORE_AUT_DOMAIN,
      projectId: process.env.FIRESTORE_PROJECT_ID,
      storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIRESTORE_MESSAGING_SENDGRID_ID,
      appId: process.env.FIRESTORE_APP_ID,
    });
    setFirebaseApp(app);
    setConfigured(true);
  }, []);

  return configured;
};

export default useConfigure;
