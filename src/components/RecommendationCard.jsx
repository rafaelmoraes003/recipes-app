import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecommendationCard({
  id, index, recommendationImage, recommendationName, recommendationType, endPoint }) {
  return (
    <div className="recommendationCard">
      <Link
        data-testid={ `${index}-recomendation-card` }
        to={ `../${endPoint}/${id}` }
      >
        <img src={ recommendationImage } alt={ recommendationName } />
        <p>{ recommendationType }</p>
        <p
          data-testid={ `${index}-recomendation-title` }
        >
          { recommendationName }
        </p>
      </Link>
    </div>
  );
}

RecommendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  recommendationImage: PropTypes.string.isRequired,
  recommendationName: PropTypes.string.isRequired,
  recommendationType: PropTypes.string.isRequired,
  endPoint: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecommendationCard;
