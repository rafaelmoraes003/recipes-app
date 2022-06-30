import { useEffect } from 'react';

const useReduxData = (data, setState, key) => {
  useEffect(() => {
    const totalRecipesNumber = 12;
    if (!Array.isArray(data) && data[key]) {
      setState(data[key].filter((food, index) => index < totalRecipesNumber));
    }
  }, [data, setState, key]);
};

export default useReduxData;
