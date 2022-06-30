/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFoods, fetchDrinks } from '../helpers/fetchRecipesAPI';
import { saveInitialFoods, saveInitialDrinks } from '../redux/actions';

const useLoadData = (categories, setRecipes, type, data) => {
  const dispatch = useDispatch();
  const totalRecipesNumber = 12;
  useEffect(() => {
    const loadRecipes = async () => {
      let recipesData;
      if (type === 'meals') {
        recipesData = await fetchFoods('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      } else {
        recipesData = await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      }
      categories();
      const usableRecipes = recipesData
        .filter((recipe, index) => index < totalRecipesNumber);
      if (type === 'meals') {
        dispatch(saveInitialFoods(usableRecipes));
      } else {
        dispatch(saveInitialDrinks(usableRecipes));
      }
      setRecipes(usableRecipes);
    };
    if (Array.isArray(data) && !data[type]) {
      loadRecipes();
    }
  }, [dispatch, data, type, setRecipes]);
};

export default useLoadData;
