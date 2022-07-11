import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useReduxData from '../customHooks/useReduxData';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchFoods, fetchCategories } from '../helpers/fetchRecipesAPI';
import RecipeCard from '../components/RecipeCard';
import CategoryButton from '../components/CategoryButton';
import useLoadData from '../customHooks/useLoadData';
import '../style/Recipes.css';

const Foods = () => {
  const totalRecipesNumber = 12;
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [appliedFilters, setAplaiedFilters] = useState({ filtered: false, filter: '' });
  const { data } = useSelector((state) => state.apiReducer);
  const { foods } = useSelector((state) => state.recipesReducer);

  const selectsCategories = async () => {
    const numberOfCategories = 5;
    const categoriesData = await fetchCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const categories = Object.values(categoriesData)[0]
      .filter((c, i) => i < numberOfCategories);
    setCategoryFoods(categories);
  };

  const filteredByCategory = async (category) => {
    if (appliedFilters.filtered && appliedFilters.filter === category) { //
      setRecipesFoods([...foods]);
      setAplaiedFilters({ filtered: false, filter: '' });
    } else {
      const recipesData = await fetchFoods(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const recipes = recipesData
        .filter((recipe, index) => index < totalRecipesNumber);
      setRecipesFoods(recipes);
      setAplaiedFilters({ filtered: true, filter: category });
    }
  };

  useLoadData(selectsCategories, setRecipesFoods, 'meals', data);

  useReduxData(data, setRecipesFoods, 'meals', selectsCategories);

  return (
    <div>
      <Header title="Foods" showSearchIcon />
      <div style={ { padding: '0 10px' } }>
        <fieldset className="categories">
          <label htmlFor="All" className="btn btn-secondary">
            <input
              className="btn-check"
              data-testid="All-category-filter"
              type="radio"
              id="All"
              name="category"
              value="All"
              onClick={ () => setRecipesFoods([...foods]) }
            />
            {' '}
            All
          </label>
          {categoryFoods
            .map(({ strCategory }) => (
              <CategoryButton
                key={ strCategory }
                categoryName={ strCategory }
                searchFunc={ filteredByCategory }
              />))}
        </fieldset>
        <div className="recipes_container">
          {recipesFoods.map(({ idMeal, strMeal, strMealThumb }, index) => (
            <RecipeCard
              key={ idMeal }
              id={ idMeal }
              index={ index }
              foodName={ strMeal }
              foodImage={ strMealThumb }
              endPoint="foods"
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Foods;
