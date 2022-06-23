import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecommendationCard({
  id, index, recommendationImage, recommendationName, endPoint }) {
  return (
    <div className="recommendationCard">
      <Link
        data-testid={ `${index}-recomendation-card` }
        to={ `../${endPoint}/${id}` }
      >
        <button type="button">
          <h3 data-testid={ `${index}-recomendation-title` }>{ recommendationName }</h3>
        </button>
      </Link>
      <img src={ recommendationImage } alt={ recommendationName } />
    </div>
  );
}

RecommendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  recommendationImage: PropTypes.string.isRequired,
  recommendationName: PropTypes.string.isRequired,
  endPoint: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecommendationCard;
