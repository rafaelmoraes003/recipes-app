import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinks } from '../helpers/fetchRecipesAPI';
import '../style/DrinkDetail.css';

const DrinkDetail = () => {
  const history = useHistory();
  const [recipe, setRecipe] = useState({ ingredientsAndMeasures: [] });

  useEffect(() => {
    const id = history.location.pathname.split('/')[2];
    const fetchRecipe = async () => {
      const recipeData = await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      console.log(recipeData);
      const entries = Object.entries(recipeData[0]);
      const ingredients = entries
        .filter((item) => JSON.stringify(item).includes('strIngredient'))
        .filter((ingredient) => ingredient[1] !== null);
      const measures = entries
        .filter((item) => JSON.stringify(item).includes('strMeasure'))
        .filter((measure) => measure[1] !== null);
      const ingredientsAndMeasures = ingredients
        .map((ingredient, index) => `${ingredient[1]} - ${measures[index][1]}`);
      setRecipe({ ...recipeData[0], ingredientsAndMeasures });
    };
    fetchRecipe();
  }, [history]);
  return (
    <section>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
      <h3 data-testid="recipe-category">{ recipe.strAlcoholic }</h3>
      <button type="button" data-testid="share-btn">Compartilhar Receita</button>
      <button type="button" data-testid="favorite-btn">Favoritar Receita</button>
      <ul>
        <h3>Ingredients</h3>
        {recipe.ingredientsAndMeasures
          .map((i, index) => (
            <li
              key={ i }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { i }
            </li>
          ))}
      </ul>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button
        className="startRecipeButton"
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe

      </button>
      <p data-testid="0-recomendation-card">Recomendações</p>
    </section>
  );
};
export default DrinkDetail;
