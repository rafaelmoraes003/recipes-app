import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ExploreFoods = () => {
  const history = useHistory();
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
        onClick={ () => { history.push(''); } }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
};

export default ExploreFoods;
