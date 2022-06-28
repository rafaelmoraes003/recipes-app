import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FoodsIngredientCard from '../components/FoodsIngredientCard';
import { fetchByIngredients } from '../helpers/fetchRecipesAPI';

const ExploreFoodsIngredients = () => {
  const DOZE = 12;
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    const fetchFoodsIngredients = async () => {
      const foodsIngredientsData = await fetchByIngredients('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const { meals } = foodsIngredientsData;
      setIngredientList(meals.slice(0, DOZE));
    };
    fetchFoodsIngredients();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" showSearchIcon={ false } />
      {ingredientList.map((ingred, index) => (
        <FoodsIngredientCard
          key={ ingred.idIngredient }
          id={ ingred.idIngredient }
          index={ index }
          ingredName={ ingred.strIngredient }
        />
      ))}
      <Footer />
    </div>
  );
};

export default ExploreFoodsIngredients;
