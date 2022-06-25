import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinks, fetchFoods } from '../helpers/fetchRecipesAPI';
import '../style/RecipesDetail.css';
import RecommendationCard from '../components/RecommendationCard';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import useFavorite from '../customHooks/useFavorite';
import
removeRecipeFromLocalStorage
from '../reusable_functions/removeRecipeFromLocalStorage';

const FoodDetail = () => {
  // const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const history = useHistory();
  const [recipe, setRecipe] = useState({ ingredientsAndMeasures: [] });
  const [recommendations, setRecommendations] = useState([]);
  const [copy, setCopy] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [done, setDone] = useState(false);
  const [startedFood, setStartedFood] = useState(false);
  // const [foodsInStorage, setFoodsInStorage] = useState(storage || []);

  useFavorite(history, setFavorite);

  const loadsRecommendations = async () => {
    const numberOfRecommendations = 5;
    const recommendationsData = await fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const usableRecommendations = recommendationsData
      .filter((r, index) => index <= numberOfRecommendations);
    setRecommendations(usableRecommendations);
  };

  useEffect(() => {
    const id = history.location.pathname.split('/')[2];
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
  }, [history]);

  const copyRecipeToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
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
    // setFoodsInStorage(foodsInStorage.concat(storagedFood));
    localStorage.setItem('favoriteRecipes', JSON.stringify(storagedFood));
    setFavorite(true);
  };

  const removeOfLocalStorage = () => {
    removeRecipeFromLocalStorage(history, setFavorite);
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storage) return setDone(true);
    const storageStarted = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageStarted) return setStartedFood(true);
  },
  [history]);

  const startedRecipe = () => {
    const id = history.location.pathname.split('/')[2];
    const storageStarted = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageStarted) {
      const startedFoodStorage = {
        ...storageStarted,
        meals: {
          ...storageStarted.meals,
          [id]: storageStarted.meals[id] ? storageStarted.meals[id] : [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(startedFoodStorage));
    } else {
      const startedFoodStorage = {
        cocktails: {},
        meals: {
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(startedFoodStorage));
    }
    setStartedFood(true);
  };

  // useEffect(() => {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(foodsInStorage));
  // }, [foodsInStorage]);

  return (
    <section>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
        className="detail_img_recipe"
      />
      <div className="detail_recipe">
        <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
        <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
        {favorite ? (
          <input
            type="image"
            src={ blackHeartIcon }
            alt="favorite"
            data-testid="favorite-btn"
            style={ { display: 'block' } }
            onClick={ removeOfLocalStorage }
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
        <ul>
          {recipe.ingredientsAndMeasures
            .map((i, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { i }
              </li>
            ))}
        </ul>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        <video
          src={ recipe.strYoutube }
          controls
          data-testid="video"
        >
          <track default kind="captions" />
        </video>
        <h3>Recommended</h3>
        <div className="container_recommendations">
          {recommendations
            .map(({ idDrink, strDrink, strDrinkThumb, strAlcoholic }, index) => (
              <RecommendationCard
                key={ idDrink }
                id={ idDrink }
                index={ index }
                recommendationType={ strAlcoholic }
                recommendationName={ strDrink }
                recommendationImage={ strDrinkThumb }
                endPoint="drinks"
              />
            ))}
        </div>
        {!done && (
          <button
            className="startRecipeButton"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => {
              startedRecipe();
              const id = history.location.pathname.split('/')[2];
              history.push(`/foods/${id}/in-progress`);
            } }
          >
            {startedFood ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}
      </div>
    </section>
  );
};
export default FoodDetail;
