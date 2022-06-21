import React, { useState } from 'react';

const RadioButtons = () => {
  const [ingredients, setIngredients] = useState(null);
  const [name, setName] = useState(null);
  const [firstLetter, setFirstLetter] = useState(null);

  return (
    <>
      <label htmlFor="ingredient">
        Ingredients
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="radio-search"
          value={ ingredients }
          onChange={ ({ target }) => setIngredients(target.value) }
        />
      </label>

      <label htmlFor="name">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="radio-search"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>

      <label htmlFor="first-letter">
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          name="radio-search"
          value={ firstLetter }
          onChange={ ({ target }) => setFirstLetter(target.value) }
        />
      </label>

      <button type="button" data-testid="exec-search-btn">
        Search
      </button>
    </>
  );
};

export default RadioButtons;
