import React from 'react';

const ProgressFoods = () => (
  <section>
    <img
      data-testid="recipe-photo"
    />
    <h1 data-testid="recipe-title">title</h1>
    <h3 data-testid="recipe-category">category</h3>
    <input
      type="button"
      data-testid="favorite-btn"
      value="Favorite"
    />
    <input
      type="button"
      data-testid="share-btn"
      value="Share"
    />
    { /* TODO: ingredients data-testid=${index}-ingredient-step */ }
    <p data-testid="instructions">instructions</p>
    <input
      type="button"
      data-testid="finish-recipe-btn"
      value="Finish Recipe"
    />
  </section>
);
export default ProgressFoods;
