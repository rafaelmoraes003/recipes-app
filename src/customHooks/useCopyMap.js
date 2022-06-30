import { useEffect } from 'react';

const useCopyMap = (array, setArray) => {
  useEffect(() => {
    const MAX_TIME = 2500;
    const interval = setTimeout(() => {
      const returnToOriginalState = array.map((recipe) => {
        if (recipe.copied === true) {
          recipe.copied = false;
        }
        return recipe;
      });
      setArray(returnToOriginalState);
    }, MAX_TIME);

    return () => clearInterval(interval);
  }, [array, setArray]);
};

export default useCopyMap;
