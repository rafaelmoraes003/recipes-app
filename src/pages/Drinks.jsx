import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { saveInitialDrinks } from '../redux/actions';
import { fetchDrinks } from '../helpers/fetchRecipesAPI';
import RecipeCard from '../components/RecipeCard';

const Drinks = () => {
  const totalRecipesNumber = 12;
  const [recipesDrinks, setRecipesDrinks] = useState([]);
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
