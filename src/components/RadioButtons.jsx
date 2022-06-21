import React from 'react';
import PropTypes from 'prop-types';

const RadioButtons = ({ handleFunctions }) => {
  const { setSearchFilter, getData } = handleFunctions;

  return (
    <>
      <label htmlFor="ingredient">
        Ingredients
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="radio-search"
          value="ingredients"
          onChange={ ({ target }) => setSearchFilter(target.value) }
        />
      </label>

      <label htmlFor="name">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="radio-search"
          value="name"
          onChange={ ({ target }) => setSearchFilter(target.value) }
        />
      </label>

      <label htmlFor="first-letter">
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          name="radio-search"
          value="first-letter"
          onChange={ ({ target }) => setSearchFilter(target.value) }
        />
      </label>

      <button type="button" data-testid="exec-search-btn" onClick={ getData }>
        Search
      </button>
    </>
  );
};

RadioButtons.propTypes = {
  handleFunctions: PropTypes.shape({
    setSearchFilter: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
  }).isRequired,
};

export default RadioButtons;
