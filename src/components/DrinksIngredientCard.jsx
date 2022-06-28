import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchByIngredients } from '../helpers/fetchRecipesAPI';
import { fetchData } from '../redux/actions/fetchDataACTION';

function DrinksIngredientCard({ index, ingredName }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const img = `https://www.thecocktaildb.com/images/ingredients/${ingredName}-Small.png`;

  async function fetchRecipesIngredient(ingredient) {
    const listByIngred = await fetchByIngredients(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    dispatch(fetchData(listByIngred));
    history.push('/drinks');
  }

  return (
    <div
      key={ index }
      className="recipe_card_ingredient"
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        src={ img }
        alt={ ingredName }
        data-testid={ `${index}-card-img` }
      />
      <button
        data-testid={ `${index}-card-name` }
        type="button"
        onClick={ () => fetchRecipesIngredient(ingredName) }
      >
        {ingredName}
      </button>
    </div>
  );
}

DrinksIngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredName: PropTypes.string.isRequired,
};

export default DrinksIngredientCard;
