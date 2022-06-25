import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ProgressFoods = () => {
  const { foodRecipesStartered } = useSelector((state) => state.recipesReducer);
  const [recipe, setRecipe] = useState({ ingredientsAndMeasures: [] });
  const [usedIngredients, setUsedIngredients] = useState([]);
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await fetchFoods(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      loadsRecommendations();
      const entries = Object.entries(recipeData[0]);
      const ingredients = entries
        .filter((item) => JSON.stringify(item).includes('strIngredient'))
        .filter((ingredient) => ingredient[1] !== '');
      const measures = entries
        .filter((item) => JSON.stringify(item).includes('strMeasure'))
        .filter((measure) => measure[1] !== ' ');
      const ingredientsAndMeasures = ingredients
        .map((ingredient, index) => `${ingredient[1]} - ${measures[index][1]}`);
      setRecipe({ ...recipeData[0], ingredientsAndMeasures });
    };
    fetchRecipe();
    const storageStarted = JSON
      .parse(localStorage.getItem('inProgressRecipes')).meals[id];
    setUsedIngredients(storageStarted);
  }, [history, foodRecipesStartered, id]);

  const usedIngredient = (index) => {
    let update = [];
    if (usedIngredients.includes(index)) {
      update = usedIngredients.filter((i) => index !== i);
    } else {
      update = [...usedIngredients, index];
    }
    const storageStarted = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const startedFoodStorage = {
      ...storageStarted,
      meals: {
        ...storageStarted.meals,
        [id]: update,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedFoodStorage));
    setUsedIngredients(update);
  };

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />
      <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
      <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
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
export default ProgressFoods;
