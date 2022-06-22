import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { saveInitialDrinks } from '../redux/actions';
import { fetchDrinks, fetchCategories } from '../helpers/fetchRecipesAPI';
import RecipeCard from '../components/RecipeCard';
import CategoryButton from '../components/CategoryButto';

const Drinks = () => {
  const totalRecipesNumber = 12;
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [appliedFilters, setAplaiedFilters] = useState({ filtered: false, filter: '' });
  const { data } = useSelector((state) => state.apiReducer);
  const { drinks } = useSelector((state) => state.recipesReducer);
  const dispatch = useDispatch();

  const selectsCategories = async () => {
    const numberOfCategories = 5;
    const categoriesData = await fetchCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const categories = Object.values(categoriesData)[0]
      .filter((c, i) => i < numberOfCategories);
    setCategoryDrinks(categories);
  };

  const filteredByCategory = async (category) => {
    if (appliedFilters.filtered && appliedFilters.filter === category) {
      setRecipesDrinks([...drinks]);
      setAplaiedFilters({ filtered: false, filter: '' });
    } else {
      const recipesData = await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const recipes = recipesData
        .filter((recipe, index) => index < totalRecipesNumber);
      setRecipesDrinks(recipes);
      setAplaiedFilters({ filtered: true, filter: category });
    }
  };

  useEffect(() => {
    const loadsDrinksRecipes = async () => {
      const recipesData = await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      selectsCategories();
      const usableRecipes = recipesData
        .filter((recipe, index) => index < totalRecipesNumber);
      setRecipesDrinks(usableRecipes);
      dispatch(saveInitialDrinks(usableRecipes));
    };
    loadsDrinksRecipes();
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(data) && data.drinks) {
      setRecipesDrinks(data.drinks.filter((drink, index) => index < totalRecipesNumber));
    }
  }, [data]);

  return (
    <div>
      <Header title="Drinks" showSearchIcon />
      <fieldset>
        <legend>Filter by category</legend>
        {categoryDrinks
          .map(({ strCategory }) => (<CategoryButton
            key={ strCategory }
            categoryName={ strCategory }
            searchFunc={ filteredByCategory }
          />))}
        <label htmlFor="All">
          <input
            data-testid="All-category-filter"
            type="radio"
            id="All"
            name="category"
            value="All"
            onClick={ () => setRecipesDrinks([...drinks]) }
          />
          {' '}
          All
        </label>
      </fieldset>
      {recipesDrinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <RecipeCard
          key={ idDrink }
          id={ idDrink }
          index={ index }
          foodName={ strDrink }
          foodImage={ strDrinkThumb }
          endPoint="drinks"
        />
      ))}
      <Footer />
    </div>
  );
};

export default Drinks;
