import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { saveInitialFoods } from '../redux/actions';
import { fetchFoods } from '../helpers/fetchRecipesAPI';
import RecipeCard from '../components/RecipeCard';

const Foods = () => {
  const totalRecipesNumber = 12;
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [categoryFoods, setCategoryFoods] = useState([]);
  const dispatch = useDispatch();

  const selectsCategories = (foodsArray) => {
    const categoriesNumber = 5;
    const categories = foodsArray.reduce((acc, { strCategory }) => {
      if (acc.length < categoriesNumber) {
        if (acc.includes(strCategory)) return acc;
        return [...acc, strCategory];
      }
      return acc;
    }, []);
    console.log(categories);
  };

  useEffect(() => {
    const loadsFoodRecipes = async () => {
      const recipesData = await fetchFoods();
      console.log(recipesData);
      selectsCategories(recipesData);
      const usableRecipes = recipesData
        .filter((recipe, index) => index < totalRecipesNumber);
      setRecipesFoods(usableRecipes);
      dispatch(saveInitialFoods(usableRecipes));
    };
    loadsFoodRecipes();
  }, [dispatch]);
  return (
    <div>
      <Header title="Foods" showSearchIcon />
      {recipesFoods.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <RecipeCard
          key={ idMeal }
          index={ index }
          foodName={ strMeal }
          foodImage={ strMealThumb }
        />
      ))}
    </div>
  );
};
export default Foods;
