import React, { useEffect, useState } from 'react';
import DrinksIngredientCard from '../components/DrinksIngredientCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchByIngredients } from '../helpers/fetchRecipesAPI';

const ExploreDrinksIngredients = () => {
  const DOZE = 12;
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    const fetchDrinksIngredients = async () => {
      const drinksIngredientsData = await fetchByIngredients('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const { drinks } = drinksIngredientsData;
      setIngredientList(drinks.slice(0, DOZE));
    };
    fetchDrinksIngredients();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" showSearchIcon={ false } />
      <div className="explore-food-container">
        {ingredientList.map((ingred, index) => (
          <DrinksIngredientCard
            key={ index }
            index={ index }
            ingredName={ ingred.strIngredient1 }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};
export default ExploreDrinksIngredients;
