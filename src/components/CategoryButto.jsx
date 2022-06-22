import PropTypes from 'prop-types';
import React from 'react';

function CategoryButton({ categoryName, searchFunc }) {
  return (
    <label htmlFor={ categoryName }>
      <input
        data-testid={ `${categoryName}-category-filter` }
        type="radio"
        id={ categoryName }
        name="category"
        value={ categoryName }
        onClick={ () => searchFunc(categoryName) }
      />
      {' '}
      { categoryName }
    </label>
  );
}

CategoryButton.propTypes = {
  categoryName: PropTypes.string.isRequired,
  searchFunc: PropTypes.func.isRequired,
};

export default CategoryButton;
