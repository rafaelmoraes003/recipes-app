import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { saveInitialFoods } from '../redux/actions';
import { fetchFoods, fetchCategories } from '../helpers/fetchRecipesAPI';
import RecipeCard from '../components/RecipeCard';
import CategoryButton from '../components/CategoryButto';

const Foods = () => {
  const totalRecipesNumber = 12;
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [categoryFoods, setCategoryFoods] = useState([]);
  const { data } = useSelector((state) => state.apiReducer);
  const dispatch = useDispatch();

  const selectsCategories = async () => {
    const numberOfCategories = 5;
    const categoriesData = await fetchCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const categories = Object.values(categoriesData)[0]
      .filter((c, i) => i < numberOfCategories);
    setCategoryFoods(categories);
  };

  useEffect(() => {
    const loadsFoodRecipes = async () => {
      const recipesData = await fetchFoods();
      selectsCategories();
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
          .map(({ strCategory }) => (<CategoryButton
            key={ strCategory }
            categoryName={ strCategory }
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
