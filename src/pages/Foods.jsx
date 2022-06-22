import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { saveInitialFoods } from '../redux/actions';
import { fetchFoods } from '../helpers/fetchRecipesAPI';
import RecipeCard from '../components/RecipeCard';
import CategoryButton from '../components/CategoryButto';

const Foods = () => {
  const totalRecipesNumber = 12;
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [categoryFoods, setCategoryFoods] = useState([]);
  const { data } = useSelector((state) => state.apiReducer);
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
    setCategoryFoods(categories);
  };

  useEffect(() => {
    const loadsFoodRecipes = async () => {
      const recipesData = await fetchFoods();
      selectsCategories(recipesData);
      const usableRecipes = recipesData
        .filter((recipe, index) => index < totalRecipesNumber);
      setRecipesFoods(usableRecipes);
      dispatch(saveInitialFoods(usableRecipes));
    };
    loadsFoodRecipes();
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(data) && data.meals) {
      setRecipesFoods(data.meals.filter((food, index) => index < totalRecipesNumber));
    }
  }, [data]);
  return (
    <div>
      <Header title="Foods" showSearchIcon />
      <fieldset>
        <legend>Filter by category</legend>
        {categoryFoods
          .map((category) => (<CategoryButton
            key={ category }
            categoryName={ category }
          />))}
      </fieldset>
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
