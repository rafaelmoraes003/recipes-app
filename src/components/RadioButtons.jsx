import React from 'react';
import PropTypes from 'prop-types';

const RadioButtons = ({ handleFunctions }) => {
  const { setSearchFilter, getData } = handleFunctions;

  return (
    <>
      <div
        style={
          { width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '20px' }
        }
      >
        <label htmlFor="ingredient" className="form-check-label">
          <input
            className="form-check-input"
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="radio-search"
            value="ingredients"
            onChange={ ({ target }) => setSearchFilter(target.value) }
          />
          Ingredients
        </label>

        <label htmlFor="name" className="form-check-label">
          <input
            className="form-check-input"
            type="radio"
            data-testid="name-search-radio"
            id="name"
            name="radio-search"
            value="name"
            onChange={ ({ target }) => setSearchFilter(target.value) }
          />
          Name
        </label>

        <label htmlFor="first-letter" className="form-check-label">
          <input
            className="form-check-input"
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter"
            name="radio-search"
            value="first-letter"
            onChange={ ({ target }) => setSearchFilter(target.value) }
          />
          First Letter
        </label>
      </div>

      <button
        style={ { width: '100%',
          maxWidth: '100vw',
          backgroundColor: '#FF204C',
          border: 'none',
          marginTop: '6px' } }
        className="btn btn-primary"
        type="button"
        data-testid="exec-search-btn"
        onClick={ getData }
      >
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
