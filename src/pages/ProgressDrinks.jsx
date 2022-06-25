import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinks } from '../helpers/fetchRecipesAPI';

const ProgressDrinks = () => {
  const [recipe, setRecipe] = useState({ ingredientsAndMeasures: [] });
  const [usedIngredients, setUsedIngredients] = useState([]);
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  useEffect(() => {
    const storageStarted = JSON
      .parse(localStorage.getItem('inProgressRecipes')).cocktails[id];
    const fetchRecipe = async () => {
      const recipeData = await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      loadsRecommendations();
      const entries = Object.entries(recipeData[0]);
      const ingredients = entries
        .filter((item) => JSON.stringify(item).includes('strIngredient'))
        .filter((ingredient) => ingredient[1] !== null);
      const measures = entries
        .filter((item) => JSON.stringify(item).includes('strMeasure'))
        .filter((measure) => measure[1] !== null);
      const ingredientsAndMeasures = ingredients
        .map((ingredient, index) => {
          if (measures[index]) {
            return `${ingredient[1]} - ${measures[index][1]}`;
          } return `${ingredient[1]}`;
        });
      setRecipe({ ...recipeData[0], ingredientsAndMeasures });
    };
    fetchRecipe();
    setUsedIngredients(storageStarted);
  }, [history, id]);

  return (
    <section>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
        className="detail_img_recipe"
      />
      <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
      <h3 data-testid="recipe-category">{ recipe.strAlcoholic }</h3>
      <input
        type="button"
        data-testid="favorite-btn"
        value="Favorite"
      />
      <input
        type="button"
        data-testid="share-btn"
        value="Share"
      />
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredientsAndMeasures
          .map((i, index) => (
            <label htmlFor={ i } key={ index } style={ { display: 'inline' } }>
              <input
                type="checkbox"
                data-testid={ `${index}-ingredient-step` }
                style={ { display: 'block' } }
                checked={
                  usedIngredients.includes(index)
                }
                onChange={ () => usedIngredient(index) }
              />
              { i }
            </label>

          ))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <input
        type="button"
        data-testid="finish-recipe-btn"
        value="Finish Recipe"
      />
    </section>
  );
};
export default ProgressDrinks;
