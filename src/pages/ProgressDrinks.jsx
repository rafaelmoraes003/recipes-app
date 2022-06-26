import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinks } from '../helpers/fetchRecipesAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import useFavorite from '../customHooks/useFavorite';
import
removeRecipeFromLocalStorage
from '../helpers/reusable_functions/removeRecipeFromLocalStorage';
import '../style/ProgressPage.css';
import { addDrinkInLocalStorage, favoriteRecipe } from '../helpers/storageFuncs';
import filterOfIngredients from '../helpers/reusable_functions/filterOfIngredients';

const ProgressDrinks = () => {
  const [recipe, setRecipe] = useState({ ingredientsAndMeasures: [] });
  const [usedIngredients, setUsedIngredients] = useState([]);
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const [copy, setCopy] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useFavorite(history, setFavorite);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const entries = Object.entries(recipeData[0]);
      const ingredientsAndMeasures = filterOfIngredients(entries);
      setRecipe({ ...recipeData[0], ingredientsAndMeasures });
    };
    fetchRecipe();
    const storageStarted = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (storageStarted && storageStarted.cocktails[id]) {
      setUsedIngredients(storageStarted.cocktails[id]);
    }
  }, [history, id]);

  const usedIngredient = (index) => {
    let update = [];
    if (usedIngredients.includes(index)) {
      update = usedIngredients.filter((i) => index !== i);
    } else {
      update = [...usedIngredients, index];
    }
    addDrinkInLocalStorage(update);
    setUsedIngredients(update);
  };

  const copyRecipeToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopy(true);
  };

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
      {favorite ? (
        <input
          type="image"
          src={ blackHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"
          style={ { display: 'block' } }
          onClick={ () => removeRecipeFromLocalStorage(history, setFavorite) }
        />
      ) : (
        <input
          type="image"
          src={ whiteHeartIcon }
          alt="non-favorite"
          data-testid="favorite-btn"
          style={ { display: 'block' } }
          onClick={ () => favoriteRecipe(recipe, setFavorite) }
        />
      )}
      <input
        type="image"
        src={ shareIcon }
        alt="share"
        data-testid="share-btn"
        onClick={ copyRecipeToClipboard }
      />

      {copy && <p style={ { color: 'green' } }>Link copied!</p>}
      <h3>Ingredients</h3>
      <div>
        {recipe.ingredientsAndMeasures
          .map((i, index) => (
            <label
              htmlFor={ i }
              key={ index }
              className={ usedIngredients.includes(index) ? 'done' : 'missing' }
            >
              <input
                type="checkbox"
                data-testid={ `${index}-ingredient-step` }
                checked={
                  usedIngredients.includes(index)
                }
                onChange={ () => usedIngredient(index) }
                id={ i }
                className={ usedIngredients.includes(index) ? 'done' : 'missing' }
              />
              { i }
            </label>

          ))}
      </div>
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
