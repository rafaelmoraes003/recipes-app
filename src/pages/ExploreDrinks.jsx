import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchSurpriseMe } from '../helpers/fetchRecipesAPI';

const ExploreDrinks = () => {
  const history = useHistory();

  const surpriseMe = async () => {
    const randomDrinkData = await fetchSurpriseMe('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = randomDrinkData;
    history.push(`/explore/drinks/${drinks[0].idDrink}`);
  };

  return (
    <div>
      <Header title="Explore Drinks" showSearchIcon={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => { history.push('/explore/drinks/ingredients'); } }
      >
        By Ingredient
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
export default ExploreDrinks;
