import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FoodsIngredientCard({ id, index, ingredName }) {
  // const history = useHistory();
  const nameCase = ingredName.toLowerCase();
  console.log(nameCase);
  const name = nameCase.replace(/\s+/g, '_');
  const img = `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
  return (
    <div
      key={ id }
      id={ id }
      className="recipe_card_ingredient"
    >
      <Link
        to={ `www.themealdb.com/api/json/v1/1/filter.php?i=${name}` }
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          src={ img }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        <p>{strCategory}</p>
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
