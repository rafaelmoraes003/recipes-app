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

  return (
    <div>
      <Header title="Drinks" showSearchIcon />

    </div>
  );
};
export default Drinks;
