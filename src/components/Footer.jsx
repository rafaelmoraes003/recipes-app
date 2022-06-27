import React from 'react';
import { useHistory } from 'react-router-dom';
import iconDrink from '../images/drinkIcon.svg';
import iconExplore from '../images/exploreIcon.svg';
import iconFood from '../images/mealIcon.svg';
import '../style/Footer.css';

const Footer = () => {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <input
        data-testid="drinks-bottom-btn"
        type="image"
        src={ iconDrink }
        alt="drink"
        onClick={ () => history.push('/drinks') }
      />
      <input
        data-testid="explore-bottom-btn"
        type="image"
        src={ iconExplore }
        alt="explore"
        onClick={ () => history.push('/explore') }
      />
      <input
        data-testid="food-bottom-btn"
        type="image"
        src={ iconFood }
        alt="food"
        onClick={ () => history.push('/foods') }
      />
    </footer>
  );
};

export default Footer;
