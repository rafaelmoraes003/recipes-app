import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ExploreDrinks = () => {
  const history = useHistory();
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
        onClick={ () => { history.push(''); } }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
};
export default ExploreDrinks;
