import React from 'react';

const DetailsFoods = () => (
  <section>
    <img src="123" alt="123" data-testid="recipe-photo" />
    <h1 data-testid="recipe-title">123</h1>
    <h3 data-testid="recipe-category">123</h3>
    <button type="button" data-testid="share-btn">Compartilhar Receita</button>
    <button type="button" data-testid="favorite-btn">Favoritar Receita</button>
    {/* TODO: ingredients => data-testid="${index}ingredient-name-and-measure"} */}
    <p data-testid="instructions">123</p>
    <video
      src="123"
      controls
      data-testid="video"
    >
      <track default kind="captions" />
    </video>
    {/* TODO: receitas recomendadas => data-testid="start-recipe-btn" */}
  </section>
);
export default DetailsFoods;
