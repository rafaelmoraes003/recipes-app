import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCopyMap from '../customHooks/useCopyMap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../style/DoneRecipes.css';

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
      <div className="container_done_recipes">
        <div className="container_buttons_recipes">
          <button
            className="btn btn-secondary btn_filter_recipes"
            type="button"
            onClick={ () => setStatus('all') }
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            className="btn btn-secondary btn_filter_recipes"
            type="button"
            onClick={ () => setStatus('food') }
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            className="btn btn-secondary btn_filter_recipes"
            type="button"
            onClick={ () => setStatus('drink') }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        {
          mapDones.map((recipes, index) => {
            if (recipes.type === 'food') {
              return (
                <div key={ index } className="container_cards_done_recipes">
                  <Link to={ `/foods/${recipes.id}` }>
                    <img
                      src={ recipes.image }
                      alt={ recipes.name }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  <div className="container_text_cards_done">
                    <div className="name_icons">
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {`${recipes.nationality} - ${recipes.category}`}
                      </p>
                      <input
                        type="image"
                        src={ shareIcon }
                        alt="share icon"
                        data-testid={ `${index}-horizontal-share-btn` }
                        onClick={ () => copyRecipeToClipboard(recipes.id, recipes.type) }
                      />
                      {recipes.copied && (
                        <span
                          style={ {
                            position: 'absolute',
                            right: '14px',
                            textAlign: 'right',
                            marginTop: '50px',
                            color: 'green',
                          } }
                        >
                          Link copied!
                        </span>)}
                    </div>
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
                      {`Done in: ${recipes.doneDate}`}
                    </p>
                    {
                      recipes.tags.map((tag, key) => (
                        <p
                          className="tags_done_recipes"
                          key={ key }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          {tag}
                        </p>
                      ))
                    }
                  </div>
                </div>);
            }
            return (
              <div key={ index } className="container_cards_done_recipes">
                <Link to={ `/drinks/${recipes.id}` }>
                  <img
                    src={ recipes.image }
                    alt={ recipes.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <div className="container_text_cards_done">
                  <div className="name_icons">
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {recipes.alcoholicOrNot}
                    </p>
                    <input
                      type="image"
                      src={ shareIcon }
                      alt="share icon"
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => copyRecipeToClipboard(recipes.id, recipes.type) }
                    />
                    {recipes.copied && (
                      <span
                        style={ {
                          position: 'absolute',
                          right: '14px',
                          textAlign: 'right',
                          marginTop: '50px',
                          color: 'green',
                        } }
                      >
                        Link copied!
                      </span>)}
                  </div>
                  <Link to={ `/drinks/${recipes.id}` }>
                    <p
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {recipes.name}
                    </p>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {`Done in: ${recipes.doneDate}`}
                  </p>
                  <p>
                    {recipes.alcoholicOrNot}
                  </p>
                  <p
                    data-testid={
                      `data-testid=${index}-${recipes.strTags}-horizontal-tag`
                    }
                  >
                    {recipes.tags}
                  </p>
                </div>
              </div>);
          })
        }
      </div>
    </div>

  );
};
export default DoneRecipes;
