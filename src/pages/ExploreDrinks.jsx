import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchSurpriseMe } from '../helpers/fetchRecipesAPI';
import beer from '../images/beer.svg';
import '../style/ExploreDrinks.css';

const ExploreDrinks = () => {
  const history = useHistory();

  const surpriseMe = async () => {
    const randomDrinkData = await fetchSurpriseMe('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = randomDrinkData;
    history.push(`/drinks/${drinks[0].idDrink}`);
  };

  return (
    <div>
      <Header title="Explore Drinks" showSearchIcon={ false } />
      <div className="explore-drinks-container">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="style-btn"
          onClick={ () => { history.push('/explore/drinks/ingredients'); } }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          className="surprise-btn"
          onClick={ () => surpriseMe() }
        >
          Surprise me!
        </button>
        <img src={ beer } alt="beer" />
      </div>
      <Footer />
    </div>
  );
};
export default ExploreDrinks;
