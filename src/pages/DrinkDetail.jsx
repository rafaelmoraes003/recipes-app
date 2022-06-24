import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
import { fetchDrinks, fetchFoods } from '../helpers/fetchRecipesAPI';
import '../style/DrinkDetail.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFavorite from '../customHooks/useFavorite';
import
removeRecipeFromLocalStorage
from '../reusable_functions/removeRecipeFromLocalStorage';

const DrinkDetail = () => {
  // const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));  // ------ NÃO APAGAR!!!
  const history = useHistory();
  const [recipe, setRecipe] = useState({
    ingredientsAndMeasures: [] });
  const [recommendations, setRecommendations] = useState([]);
  const [copy, setCopy] = useState(false);
  const [favorite, setFavorite] = useState(false);
  // const [foodsInStorage, setFoodsInStorage] = useState(storage || []);  // ------ NÃO APAGAR!!!

  useFavorite(history, setFavorite);

  const loadsRecommendations = async () => {
    const numberOfRecommendations = 5;
    const recommendationsData = await fetchFoods('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const usableRecommendations = recommendationsData
      .filter((r, index) => index <= numberOfRecommendations);
    setRecommendations(usableRecommendations);
  };

  useEffect(() => {
    const id = history.location.pathname.split('/')[2];
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
  }, [history]);

  const copyRecipeToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopy(true);
  };

  const favoriteRecipe = () => {
    const storagedFood = [{
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    }];
    // setFoodsInStorage(foodsInStorage.concat(storagedFood));  // ------ NÃO APAGAR!!!!
    localStorage.setItem('favoriteRecipes', JSON.stringify(storagedFood));
    setFavorite(true);
  };

  const removeOfLocalStorage = () => {
    removeRecipeFromLocalStorage(history, setFavorite);
  };

  // useEffect(() => {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(foodsInStorage)); // ------ NÃO APAGAR!!!!
  // }, [foodsInStorage]);

  return (
    <section>
      {favorite && (
        <button
          type="button"
          src={ blackHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"
          style={ { display: 'block' } }
          onClick={ removeOfLocalStorage }
        >
          <img
            src={ blackHeartIcon }
            alt="favorite"
          />
        </button>
      )}

      {!favorite && (
        <button
          type="button"
          src={ whiteHeartIcon }
          alt="non-favorite"
          data-testid="favorite-btn"
          style={ { display: 'block' } }
          onClick={ favoriteRecipe }
        >
          <img
            src={ whiteHeartIcon }
            alt="non-favorite"
          />
        </button>
      )}

      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
      <h3 data-testid="recipe-category">{ recipe.strAlcoholic }</h3>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyRecipeToClipboard }
      >
        Compartilhar Receita
      </button>

      <button
        type="button"
      >
        Favoritar Receita
      </button>

      {copy && <p style={ { color: 'green' } }>Link copied!</p>}

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
        onClick={ () => {
          const id = history.location.pathname.split('/')[2];
          history.push(`/drinks/${id}/in-progress`);
        } }
      >
        Start Recipe

      </button>
      <div>
        {recommendations.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <RecommendationCard
            key={ idMeal }
            id={ idMeal }
            index={ index }
            recommendationName={ strMeal }
            recommendationImage={ strMealThumb }
            endPoint="foods"
          />
        ))}
      </div>
    </section>
  );
};
export default DrinkDetail;
