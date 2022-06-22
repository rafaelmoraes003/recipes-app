import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecipeCard({ id, index, foodImage, foodName, endPoint }) {
  const history = useHistory();
  return (
    <div>
      <button
        type="button"
        data-testid={ `${index}-recipe-card` }
        onClick={ () => history.push(`${endPoint}/${id}`) }
      >
        <h3 data-testid={ `${index}-card-name` }>{ foodName }</h3>

      </button>
      <img src={ foodImage } alt={ foodName } data-testid={ `${index}-card-img` } />
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  foodImage: PropTypes.string.isRequired,
  foodName: PropTypes.string.isRequired,
  endPoint: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeCard;
