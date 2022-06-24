import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
import { fetchDrinks, fetchFoods } from '../helpers/fetchRecipesAPI';
import '../style/RecipesDetail.css';

const DrinkDetail = () => {
  const history = useHistory();
  const [recipe, setRecipe] = useState({
    ingredientsAndMeasures: [] });
  const [recommendations, setRecommendations] = useState([]);

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
  return (
    <section>
      <div className="img_detail">
        <img
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrink }
          data-testid="recipe-photo"
          className="detail_img_recipe"
        />
      </div>
      <div className="detail_recipe">
        <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
        <h3 data-testid="recipe-category">{ recipe.strAlcoholic }</h3>
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
        <h3>Recommended</h3>
        <div className="container_recommendations">
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
      </div>
    </section>
  );
};
export default DrinkDetail;
