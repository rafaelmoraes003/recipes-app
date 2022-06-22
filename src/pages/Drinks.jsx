import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { saveInitialDrinks } from '../redux/actions';
import { fetchDrinks } from '../helpers/fetchRecipesAPI';
import RecipeCard from '../components/RecipeCard';
import CategoryButton from '../components/CategoryButto';

const Drinks = () => {
  const totalRecipesNumber = 12;
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const { data } = useSelector((state) => state.apiReducer);
  const dispatch = useDispatch();

  const selectsCategories = (drinksArray) => {
    const categoriesNumber = 5;
    const categories = drinksArray.reduce((acc, { strCategory }) => {
      if (acc.length < categoriesNumber) {
        if (acc.includes(strCategory)) return acc;
        return [...acc, strCategory];
      }
      return acc;
    }, []);
    setCategoryDrinks(categories);
  };

  useEffect(() => {
    const loadsDrinksRecipes = async () => {
      const recipesData = await fetchDrinks();
      selectsCategories(recipesData);
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
          .map((category) => (<CategoryButton
            key={ category }
            categoryName={ category }
          />))}
      </fieldset>
      {recipesDrinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <RecipeCard
          key={ idDrink }
          index={ index }
          foodName={ strDrink }
          foodImage={ strDrinkThumb }
        />
      ))}
    </div>
  );
};

export default Drinks;
