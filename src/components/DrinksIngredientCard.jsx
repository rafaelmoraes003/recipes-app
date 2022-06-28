import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinksIngredientCard({ index, ingredName }) {
  const nameImg = ingredName
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  const name = nameImg.replaceAll(' ', '%20');
  const img = `www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
  console.log(img);
  return (
    <div
      key={ index }
      className="recipe_card_ingredient"
    >
      <Link
        to="/drinks"
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          src={ img }
          alt={ nameImg }
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          {ingredName}
        </p>
      </Link>
    </div>
  );
}

DrinksIngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredName: PropTypes.string.isRequired,
};

export default DrinksIngredientCard;
