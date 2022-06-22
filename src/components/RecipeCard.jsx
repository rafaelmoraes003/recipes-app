import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ index, foodImage, foodName }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{ foodName }</h3>
      <img src={ foodImage } alt={ foodName } data-testid={ `${index}-card-img` } />
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  foodImage: PropTypes.string.isRequired,
  foodName: PropTypes.string.isRequired,
};

export default RecipeCard;
