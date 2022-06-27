import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchFoods } from '../helpers/fetchRecipesAPI';
import '../style/Nationality.css';

const ExploreFoodNationality = () => {
  const history = useHistory();
  const [countries, setCountries] = useState([]);
  const [foods, setFoods] = useState([]);
  const [foodsFiltered, setFoodsFiltered] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      setCountries(data.meals);
    };
    const fetchAllFoods = async () => {
      const recipesData = await fetchFoods('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setFoods(recipesData);
      setFoodsFiltered(recipesData);
    };
    fetchCountries();
    fetchAllFoods();
  },
  [history]);

  const renderCountries = () => countries.map((country) => (
    <option
      data-testid={ `${country.strArea}-option` }
      key={ country.strArea }
      value={ country.strArea }
    >
      {country.strArea}
    </option>
  ));

  const renderFoods = () => {
    const MAX_FOODS = 12;
    const foodsTwelve = foodsFiltered.slice(0, MAX_FOODS);
    return foodsTwelve
      .map(({ idMeal, strMeal, strMealThumb, strCategory }, index) => (
        <div
          key={ idMeal }
          id={ idMeal }
          className="recipe_card_nationality"
        >
          <Link
            to={ `../../foods/${idMeal}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p>{strCategory}</p>
            <p
              data-testid={ `${index}-card-name` }
            >
              {strMeal}
            </p>
          </Link>
        </div>
      ));
  };

  const changeByFilter = async ({ target }) => {
    const { value } = target;
    if (value === 'all') {
      setFoodsFiltered(foods);
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
      const data = await response.json();
      setFoodsFiltered(data.meals);
    }
  };

  return (
    <section>
      <Header title="Explore Nationalities" showSearchIcon />
      <div style={ { padding: '0 10px' } }>
        <select
          className="form-control form_control"
          data-testid="explore-by-nationality-dropdown"
          onChange={ changeByFilter }
        >
          <option
            value="all"
            data-testid="All-option"
          >
            All
          </option>
          { countries && renderCountries() }
        </select>
      </div>
      <div
        style={ { padding: '0 10px' } }
        className="container_recipes_nationality"
      >
        { foodsFiltered && renderFoods() }
      </div>
      <Footer />
    </section>
  );
};
export default ExploreFoodNationality;
