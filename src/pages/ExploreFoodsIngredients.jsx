import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FoodsIngredientCard from '../components/FoodsIngredientCard';
import { fetchByIngredients } from '../helpers/fetchRecipesAPI';
// https://www.figma.com/file/cBDVGdqQxUuVlQp3ehW7wx/Recipes-App?node-id=0%3A1
// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
// https://www.themealdb.com/api/json/v1/1/list.php?i=list
// https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
// www.thecocktaildb.com/images/ingredients/gin-Small.png

const ExploreFoodsIngredients = () => {
  const DOZE = 12;
  useEffect(() => {
    const fetchFoodsIngredients = async () => {
      const foodsIngredientsData = await fetchByIngredients('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const { meals } = foodsIngredientsData;
      const ingredientList = meals.slice(0, DOZE);
      console.log(ingredientList);
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
          foodName={ ingred.strIngredient }
        />
      ))}
      <Footer />
    </div>
  );
};

export default ExploreFoodsIngredients;
