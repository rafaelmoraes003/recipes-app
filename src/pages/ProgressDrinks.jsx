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
import {
  addDrinkInLocalStorage,
  doneRecipeDrinkFunc,
  drinksInLocalStorage,
  drinksToFavorite, favoriteRecipes } from '../helpers/storageFuncs';
import filterOfIngredients from '../helpers/reusable_functions/filterOfIngredients';
import '../style/ProgressRecipes.css';

const ProgressDrinks = () => {
  const [recipe, setRecipe] = useState({ ingredientsAndMeasures: [] });
  const [usedIngredients, setUsedIngredients] = useState([]);
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const [copy, setCopy] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const date = new Date(Date.now()).toLocaleDateString();

  useFavorite(history, setFavorite);

  useEffect(() => {
    favoriteRecipes(history, setFavorite);
    drinksInLocalStorage(id);
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
    addDrinkInLocalStorage(update, id);
    setUsedIngredients(update);
  };

  const copyRecipeToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href.split('/in')[0]);
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
      <div className="container_in_progress">
        <div className="name_icons">
          <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
          <input
            className="share_icon"
            type="image"
            src={ shareIcon }
            alt="share"
            data-testid="share-btn"
            onClick={ copyRecipeToClipboard }
          />
          {favorite ? (
            <input
              className="heart_icon"
              type="image"
              src={ blackHeartIcon }
              alt="favorite"
              data-testid="favorite-btn"
              style={ { display: 'block' } }
              onClick={ () => removeRecipeFromLocalStorage(history, setFavorite) }
            />
          ) : (
            <input
              className="heart_icon"
              type="image"
              src={ whiteHeartIcon }
              alt="non-favorite"
              data-testid="favorite-btn"
              style={ { display: 'block' } }
              onClick={ () => drinksToFavorite(recipe, setFavorite) }
            />
          )}
        </div>
        {copy && (
          <span
            style={ {
              position: 'absolute',
              right: '10px',
              textAlign: 'right',
              color: 'green',
            } }
          >
            Link copied!
          </span>)}
        <h3
          className="sub_title"
          data-testid="recipe-category"
        >
          { recipe.strAlcoholic }
        </h3>
        <h3>Ingredients</h3>
        <div className="container_progress_checkbox">
          {recipe.ingredientsAndMeasures
            .map((i, index) => (
              <label
                htmlFor={ i }
                key={ index }
                className={ usedIngredients.includes(index) ? 'done' : 'missing' }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  checked={
                    usedIngredients.includes(index)
                  }
                  onChange={ () => usedIngredient(index) }
                  id={ i }
                  className={ usedIngredients
                    .includes(index)
                    ? 'done' : 'missing' }
                />
                {' '}
                { i }
              </label>
            ))}
        </div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
          className="container_progress_text"
        >
          { recipe.strInstructions }
        </p>
        <input
          className="finish_recipe_button"
          type="button"
          data-testid="finish-recipe-btn"
          value="Finish Recipe"
          disabled={ recipe.ingredientsAndMeasures.length !== usedIngredients.length }
          onClick={ () => {
            doneRecipeDrinkFunc(recipe, date);
            history.push('/done-recipes');
          } }
        />
      </div>
    </section>
  );
};
export default ProgressDrinks;
