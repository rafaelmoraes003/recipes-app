import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
import { fetchDrinks, fetchFoods } from '../helpers/fetchRecipesAPI';
import '../style/RecipesDetail.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import removeRecipeFromLocalStorage
from '../helpers/reusable_functions/removeRecipeFromLocalStorage';
import {
  doneRecipes,
  drinksInLocalStorage,
  drinksToFavorite, favoriteRecipes } from '../helpers/storageFuncs';
import filterOfIngredients from '../helpers/reusable_functions/filterOfIngredients';

const DrinkDetail = () => {
  // const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));  // ------ NÃO APAGAR!!!
  const history = useHistory();
  const [recipe, setRecipe] = useState({
    ingredientsAndMeasures: [] });
  const [recommendations, setRecommendations] = useState([]);
  const [copy, setCopy] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [done, setDone] = useState(false);
  const [startedFood, setStartedDrink] = useState(false);
  const id = history.location.pathname.split('/')[2];
  // const [foodsInStorage, setFoodsInStorage] = useState(storage || []);  // ------ NÃO APAGAR!!!

  const loadsRecommendations = async () => {
    const numberOfRecommendations = 5;
    const recommendationsData = await fetchFoods('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const usableRecommendations = recommendationsData
      .filter((r, index) => index <= numberOfRecommendations);
    setRecommendations(usableRecommendations);
  };

  useEffect(() => {
    favoriteRecipes(history, setFavorite);
    const fetchRecipe = async () => {
      const recipeData = await fetchDrinks(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      loadsRecommendations();
      const entries = Object.entries(recipeData[0]);
      const ingredientsAndMeasures = filterOfIngredients(entries);
      setRecipe({ ...recipeData[0], ingredientsAndMeasures });
    };
    fetchRecipe();
  }, [history, id]);

  const copyRecipeToClipboard = async () => {
    await navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopy(true);
  };

  useEffect(() => {
    doneRecipes(history, setDone);
    const storageStarted = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageStarted && storageStarted.cocktails[id]) return setStartedDrink(true);
  },
  [id, history]);

  const startedRecipe = () => {
    drinksInLocalStorage(id);
  };

  // useEffect(() => {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(foodsInStorage)); // ------ NÃO APAGAR!!!!
  // }, [foodsInStorage]);

  return (
    <section>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
        className="detail_img_recipe"
      />
      <div className="detail_recipe">
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
        <ul>
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
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        <h3>Recommended</h3>
        <div className="container_recommendations">
          {recommendations
            .map(({ idMeal, strMeal, strMealThumb, strCategory }, index) => (
              <RecommendationCard
                key={ idMeal }
                id={ idMeal }
                index={ index }
                recommendationType={ strCategory }
                recommendationName={ strMeal }
                recommendationImage={ strMealThumb }
                endPoint="foods"
              />
            ))}
        </div>
        {!done && (
          <button
            className="startRecipeButton"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => {
              history.push(`/drinks/${id}/in-progress`);
              startedRecipe();
            } }
          >
            {startedFood ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}
      </div>
    </section>
  );
};
export default DrinkDetail;
