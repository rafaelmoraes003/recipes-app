import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storageFavorite || storageFavorite.lenght > 0) {
      storageFavorite.copied = false;
      setFavoriteRecipes(storageFavorite);
    }
  }, []);

  const copyRecipeToClipboard = async ({ target }) => {
    const { id, name } = target;
    let url;
    if (name === 'drink') {
      url = `http://localhost:3000/drinks/${id}`;
      await navigator.clipboard.writeText(url);
    } else {
      url = `http://localhost:3000/foods/${id}`;
      await navigator.clipboard.writeText(url);
    }
    const copiedRecipe = favoriteRecipes.map((recipe) => {
      if (recipe.id === id) {
        recipe.copied = true;
      }
      return recipe;
    });
    setFavoriteRecipes(copiedRecipe);
  };

  return (
    <div>
      <Header />
      <div className="filter-buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </div>
      {favoriteRecipes.map((recipe, i) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${i}-horizontal-image` }
            style={ { width: '150px' } }
          />
          <h3 data-testid={ `${i}-horizontal-name` }>
            {recipe.name}
          </h3>
          <h4
            data-testid={ `${i}-horizontal-top-text` }
          >
            {recipe.type === 'food'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </h4>
          <input
            type="image"
            src={ shareIcon }
            alt="share recipe button"
            data-testid={ `${i}-horizontal-share-btn` }
            onClick={ copyRecipeToClipboard }
            id={ recipe.id }
            name={ recipe.type }
          />

          <input
            type="image"
            src={ blackHeartIcon }
            alt="favorite recipe button"
            data-testid={ `${i}-horizontal-favorite-btn` }
          />

          {recipe.copied && (
            <p
              id={ recipe.id }
              style={ { color: 'green' } }
            >
              Link copied!
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FavoriteRecipes;
