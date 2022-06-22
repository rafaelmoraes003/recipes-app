import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { saveInitialFoods } from '../redux/actions';
import { fetchFoods, fetchCategories } from '../helpers/fetchRecipesAPI';
import RecipeCard from '../components/RecipeCard';
import CategoryButton from '../components/CategoryButto';
// import { fetchData } from '../redux/actions/fetchDataACTION';

const Foods = () => {
  const totalRecipesNumber = 12;
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [appliedFilters, setAplaiedFilters] = useState({ filtered: false, filter: '' });
  const { data } = useSelector((state) => state.apiReducer);
  const { foods } = useSelector((state) => state.recipesReducer);
  const dispatch = useDispatch();

  const selectsCategories = async () => {
    const numberOfCategories = 5;
    const categoriesData = await fetchCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const categories = Object.values(categoriesData)[0]
      .filter((c, i) => i < numberOfCategories);
    setCategoryFoods(categories);
  };

  const filteredByCategory = async (category) => {
    if (appliedFilters.filtered && appliedFilters.filter === category) {
      setRecipesFoods([...foods]);
      setAplaiedFilters({ filtered: false, filter: '' });
    } else {
      const recipesData = await await fetchFoods(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const recipes = recipesData
        .filter((recipe, index) => index < totalRecipesNumber);
      setRecipesFoods(recipes);
      setAplaiedFilters({ filtered: true, filter: category });
    }
  };

  useEffect(() => {
    const loadsFoodRecipes = async () => {
      const recipesData = await fetchFoods('https://www.themealdb.com/api/json/v1/1/search.php?s=');
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
            searchFunc={ filteredByCategory }
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
