import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { headerTitleState } from '../Layout/store';

const useTitle = (title) => {
  const setTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    document.title = `Resume${title ? ' - ' + title : ''}`;
    setTitle(title);
  }, [title]);
};

export default useTitle;
