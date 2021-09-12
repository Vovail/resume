import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const setTrue = () => {
    setState(true);
  };
  const setFalse = () => {
    setState(false);
  };
  const toggle = () => {
    setState((oldState) => !oldState);
  };

  return [state, setTrue, setFalse, toggle] as const;
};

export default useToggle;
