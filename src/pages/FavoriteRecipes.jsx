import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../style/FavoriteRecipes.css';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [baseFav, setBaseFav] = useState([]);

  useEffect(() => {
    const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storageFavorite) {
      setFavoriteRecipes(storageFavorite);
      setBaseFav(storageFavorite);
    }
  }, []);

  useEffect(() => {
    const MAX_TIME = 3000;
    const interval = setTimeout(() => {
      const returnToOriginalState = baseFav.map((recipe) => {
        if (recipe.copied === true) {
          recipe.copied = false;
        }
        return recipe;
      });
      setBaseFav(returnToOriginalState);
    }, MAX_TIME);

    return () => clearInterval(interval);
  }, [baseFav]);

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
    setBaseFav(copiedRecipe);
  };

  const filterByMeal = () => {
    const meals = favoriteRecipes.filter((recipe) => recipe.type === 'food');
    setBaseFav(meals);
  };

  const filterByDrink = () => {
    const drinks = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
    setBaseFav(drinks);
  };

  const removeAllFilters = () => {
    setBaseFav(favoriteRecipes);
  };

  useEffect(() => {
    setBaseFav(favoriteRecipes);
  }, [favoriteRecipes]);

  const removeRecipeFromLocalStorage = ({ target }) => {
    const { id } = target;
    const removedRecipe = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(removedRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedRecipe));
  };

  return (
    <div>
      <Header title="Favorite Recipes" showSearchIcon={ false } />
      <div className="container_done_recipes">
        <div className="container_buttons_recipes">
          <button
            className="btn btn-secondary btn_filter_recipes"
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ removeAllFilters }
          >
            All
          </button>
          <button
            className="btn btn-secondary btn_filter_recipes"
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ filterByMeal }
          >
            Food
          </button>
          <button
            className="btn btn-secondary btn_filter_recipes"
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ filterByDrink }
          >
            Drink
          </button>
        </div>
        { baseFav.length > 0 && baseFav.map((recipe, i) => (
          <div key={ recipe.id } className="container_cards_done_recipes">
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${i}-horizontal-image` }
                style={ { width: '150px', cursor: 'pointer' } }
              />
            </Link>
            <div className="container_text_cards_done">
              <p
                data-testid={ `${i}-horizontal-top-text` }
              >
                {recipe.type === 'food'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.alcoholicOrNot}`}
              </p>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <p
                  data-testid={ `${i}-horizontal-name` }
                  style={ { cursor: 'pointer' } }
                >
                  {recipe.name}
                </p>
              </Link>
              <div className="inputs_icons">
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
                  id={ recipe.id }
                  onClick={ removeRecipeFromLocalStorage }
                />
                {recipe.copied && (
                  <span
                    id={ recipe.id }
                    style={ {
                      position: 'absolute',
                      right: '30vw',
                      textAlign: 'center',
                      marginTop: '60px',
                      color: 'green',
                    } }
                  >
                    Link copied!
                  </span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
