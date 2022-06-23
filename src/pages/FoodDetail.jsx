import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFoods } from '../helpers/fetchRecipesAPI';

const FoodDetail = () => {
  const history = useHistory();
  const [recipe, setRecipe] = useState({ ingredientsAndMeasures: [] });

  useEffect(() => {
    const id = history.location.pathname.split('/')[2];
    const fetchRecipe = async () => {
      const recipeData = await fetchFoods(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      console.log(recipeData);
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
  }, [history]);
  return (
    <section>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
      <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
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
      <video
        src={ recipe.strYoutube }
        controls
        data-testid="video"
      >
        <track default kind="captions" />
      </video>
      {/* TODO: receitas recomendadas => data-testid="${index}-recomendation-card" */}
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </section>
  );
};
export default FoodDetail;
