import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchFoods } from '../helpers/fetchRecipesAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import useFavorite from '../customHooks/useFavorite';
import
removeRecipeFromLocalStorage
from '../helpers/reusable_functions/removeRecipeFromLocalStorage';
import '../style/ProgressPage.css';
import filterOfIngredients from '../helpers/reusable_functions/filterOfIngredients';
import { foodsInLocalStorage } from '../helpers/storageFuncs';

const ProgressFoods = () => {
  const { foodRecipesStartered } = useSelector((state) => state.recipesReducer);
  const [recipe, setRecipe] = useState({ ingredientsAndMeasures: [] });
  const [usedIngredients, setUsedIngredients] = useState([]);
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const [copy, setCopy] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useFavorite(history, setFavorite);

  useEffect(() => {
    foodsInLocalStorage(id);
    const fetchRecipe = async () => {
      const recipeData = await fetchFoods(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const entries = Object.entries(recipeData[0]);
      const ingredientsAndMeasures = filterOfIngredients(entries);
      setRecipe({ ...recipeData[0], ingredientsAndMeasures });
    };
    fetchRecipe();
    const storageStarted = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (storageStarted && storageStarted.meals[id]) {
      setUsedIngredients(storageStarted.meals[id]);
    }
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

  const copyRecipeToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href.split('/in')[0]);
    setCopy(true);
  };

  const favoriteRecipe = () => {
    const storagedFood = [{
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(storagedFood));
    setFavorite(true);
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
          onClick={ favoriteRecipe }
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
      <div className="data-ingredients">
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
        disabled={ recipe.ingredientsAndMeasures.length !== usedIngredients.length }
        onClick={ () => history.push('/done-recipes') }
      />
    </section>
  );
};
export default ProgressFoods;
