import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinks, fetchFoods } from '../helpers/fetchRecipesAPI';
import '../style/RecipesDetail.css';
import RecommendationCard from '../components/RecommendationCard';

const FoodDetail = () => {
  const history = useHistory();
  const [recipe, setRecipe] = useState({ ingredientsAndMeasures: [] });
  const [recommendations, setRecommendations] = useState([]);

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
  return (
    <section>
      <div className="img_detail">
        <img
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
          data-testid="recipe-photo"
          className="detail_img_recipe"
        />
      </div>
      <div className="detail_recipe">
        <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
        <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
        <button type="button" data-testid="share-btn">Compartilhar Receita</button>
        <button type="button" data-testid="favorite-btn">Favoritar Receita</button>
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
        <button
          className="startRecipeButton"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => {
            const id = history.location.pathname.split('/')[2];
            history.push(`/foods/${id}/in-progress`);
          } }
        >
          Start Recipe
        </button>
      </div>
    </section>
  );
};
export default FoodDetail;
