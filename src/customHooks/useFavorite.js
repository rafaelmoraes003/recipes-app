import { useEffect } from 'react';

const useFavorite = (dependency, setState) => {
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage) {
      const id = dependency.location.pathname.split('/')[2];
      setState(storage.some((food) => food.id === id));
    }
  }, [dependency, setState]);
};

export default useFavorite;
