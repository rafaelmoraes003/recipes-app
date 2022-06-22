import PropTypes from 'prop-types';
import React from 'react';

function CategoryButton({ categoryName }) {
  return (
    <label htmlFor={ categoryName }>
      <input type="radio" id={ categoryName } name="category" value={ categoryName } />
      {' '}
      { categoryName }
    </label>
  );
}

CategoryButton.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default CategoryButton;
