import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCopyMap from '../customHooks/useCopyMap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const DoneRecipes = () => {
  const [mapDones, setmapDones] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [status, setStatus] = useState();
  // const [copy, setCopy] = useState(false);

  useEffect(() => {
    const dones = JSON.parse(localStorage.getItem('doneRecipes'));
    if (dones) {
      setmapDones(dones);
      setAllRecipes(dones);
    }
  }, []);

  useEffect(() => {
    if (status === 'all') {
      setmapDones(allRecipes);
    }
    if (status === 'food') {
      const foods = allRecipes.filter((dones) => dones.type === 'food');
      setmapDones(foods);
    }
    if (status === 'drink') {
      const drink = allRecipes.filter((dones) => dones.type === 'drink');
      setmapDones(drink);
    }
  }, [status, allRecipes]);

  const copyRecipeToClipboard = async (id, type) => {
    if (type === 'food') {
      await navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    } else {
      await navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    }
    const copiedRecipe = mapDones.map((recipe) => {
      if (recipe.id === id) {
        recipe.copied = true;
      }
      return recipe;
    });
    setmapDones(copiedRecipe);
  };

  useCopyMap(mapDones, setmapDones);

  return (

    <div>

      <Header title="Done Recipes" showSearchIcon={ false } />
      <div>
        <button
          type="button"
          onClick={ () => setStatus('all') }
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          type="button"
          onClick={ () => setStatus('food') }
          data-testid="filter-by-food-btn"
        >
          Food

        </button>
        <button
          type="button"
          onClick={ () => setStatus('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks

        </button>
        {

          mapDones.map((recipes, index) => {
            if (recipes.type === 'food') {
              return (
                <div key={ index }>
                  <Link to={ `/foods/${recipes.id}` }>
                    <img
                      style={ { width: '150px' } }// Necessario para aprovar no teste
                      src={ recipes.image }
                      alt={ recipes.name }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }

                  >
                    {`${recipes.nationality} - ${recipes.category}`}

                  </p>
                  <Link to={ `/foods/${recipes.id}` }>
                    <p
                      data-testid={ `${index}-horizontal-name` }
                    >

                      {recipes.name}

                    </p>
                  </Link>

                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {recipes.doneDate}

                  </p>
                  <input
                    type="image"
                    src={ shareIcon }
                    alt="share icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => copyRecipeToClipboard(recipes.id, recipes.type) }
                  />
                  {recipes.copied && <p style={ { color: 'green' } }>Link copied!</p>}
                  {
                    recipes.tags.map((tag, key) => (
                      <p
                        key={ key }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>
                    ))
                  }
                </div>);
            }
            return (
              <div key={ index }>
                <Link to={ `/drinks/${recipes.id}` }>
                  <img
                    src={ recipes.image }
                    style={ { width: '150px' } } // Necessario para aprovar no teste
                    alt={ recipes.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <Link to={ `/drinks/${recipes.id}` }>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipes.name}
                  </p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipes.alcoholicOrNot}

                </p>

                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipes.doneDate}

                </p>
                <p>
                  {recipes.alcoholicOrNot}
                </p>
                <input
                  type="image"
                  src={ shareIcon }
                  alt="share icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => copyRecipeToClipboard(recipes.id, recipes.type) }
                />
                {recipes.copied && <p style={ { color: 'green' } }>Link copied!</p>}
                <p
                  data-testid={
                    `data-testid=${index}-${recipes.strTags}-horizontal-tag`
                  }
                >
                  {recipes.tags}
                </p>
              </div>);
          })

        }

      </div>
    </div>

  );
};
export default DoneRecipes;
