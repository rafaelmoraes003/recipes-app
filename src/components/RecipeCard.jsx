import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/RecipeCard.css';

function RecipeCard({ id, index, foodImage, foodName, endPoint }) {
  return (
    <div className="cards">
      <Link
        data-testid={ `${index}-recipe-card` }
        to={ `../${endPoint}/${id}` }
      >
        <img src={ foodImage } alt={ foodName } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{ foodName }</p>
      </Link>
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
