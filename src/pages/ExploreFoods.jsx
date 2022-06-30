import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchSurpriseMe } from '../helpers/fetchRecipesAPI';

const ExploreFoods = () => {
  const history = useHistory();

  const surpriseMe = async () => {
    const randomRecipeData = await fetchSurpriseMe('https://www.themealdb.com/api/json/v1/1/random.php');
    const { meals } = randomRecipeData;
    history.push(`/foods/${meals[0].idMeal}`);
  };

  return (
    <div>
      <Header title="Explore Foods" showSearchIcon={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => { history.push('/explore/foods/ingredients'); } }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => { history.push('/explore/foods/nationalities'); } }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => surpriseMe() }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
};

export default ExploreFoods;
