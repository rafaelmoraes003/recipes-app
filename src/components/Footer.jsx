import React from 'react';
import { useHistory } from 'react-router-dom';
import iconDrink from '../images/drinkIcon.svg';
import iconExplore from '../images/exploreIcon.svg';
import iconFood from '../images/mealIcon.svg';
import '../style/Footer.css';

const Footer = () => {
  const history = useHistory();
  const white = 'brightness(0) invert(1)';

  return (
    <footer data-testid="footer">
      <input
        style={ { filter: white } }
        data-testid="drinks-bottom-btn"
        type="image"
        src={ iconDrink }
        alt="drink"
        onClick={ () => history.push('/drinks') }
      />
      <input
        style={ { filter: white } }
        data-testid="explore-bottom-btn"
        type="image"
        src={ iconExplore }
        alt="explore"
        onClick={ () => history.push('/explore') }
      />
      <input
        style={ { filter: white } }
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
