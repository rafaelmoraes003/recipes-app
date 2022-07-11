import { useEffect } from 'react';

const useReduxData = (data, setState, key, categories) => {
  useEffect(() => {
    const totalRecipesNumber = 12;
    if (!Array.isArray(data) && data[key]) {
      setState(data[key].filter((food, index) => index < totalRecipesNumber));
    }
    categories();
  }, [data, setState, key]);
};

export default useReduxData;
