import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { saveInitialDrinks } from '../redux/actions';
import { fetchDrinks } from '../helpers/fetchRecipesAPI';
import RecipeCard from '../components/RecipeCard';

const Drinks = () => {
  const totalRecipesNumber = 12;
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const { data } = useSelector((state) => state.apiReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadsDrinksRecipes = async () => {
      const recipesData = await fetchDrinks();
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
