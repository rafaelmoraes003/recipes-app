import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FoodsIngredientCard({ id, index, ingredName }) {
  const nameImg = ingredName.replaceAll(' ', '%20');
  const img = `https://www.themealdb.com/images/ingredients/${nameImg}-Small.png`;
  return (
    <div
      key={ id }
      id={ id }
      className="recipe_card_ingredient"
    >
      <Link
        to="/foods"
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

FoodsIngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default FoodsIngredientCard;
