import { useEffect } from 'react';

const useCopy = (state, setState) => {
  useEffect(() => {
    const MAX_TIME = 3500;
    let interval;
    if (state) {
      interval = setTimeout(() => {
        setState(false);
      }, MAX_TIME);
    }
    return () => clearInterval(interval);
  }, [state, setState]);
};

export default useCopy;
