import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RadioButtons from './RadioButtons';
import { fetchData } from '../redux/actions/fetchDataACTION';
import '../style/Header.css';

const Header = ({ title, showSearchIcon }) => {
  const [showInput, setShowInput] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.apiReducer);
  const warning = 'Sorry, we haven\'t found any recipes for these filters.';

  useEffect(() => {
    if (Object.values(data)[0] !== undefined && Object.values(data)[0].length === 1) {
      if (title === 'Foods') {
        const foodId = Object.values(data)[0][0].idMeal;
        history.push(`/foods/${foodId}`);
      } else if (title === 'Drinks') {
        const drinkId = Object.values(data)[0][0].idDrink;
        history.push(`/drinks/${drinkId}`);
      }
    }
  }, [data, title, history]);

  const goToProfile = () => {
    history.push('/profile');
  };

  const fetchByIngredients = async (db) => {
    const ingredientResponse = await fetch(`https://www.${db}.com/api/json/v1/1/filter.php?i=${searchInput}`);
    const ingredientData = await ingredientResponse.json();
    if (Object.values(ingredientData)[0] !== null) {
      dispatch(fetchData(ingredientData));
    } else {
      global.alert(warning);
    }
  };

  const fetchByName = async (db) => {
    const nameResponse = await fetch(`https://www.${db}.com/api/json/v1/1/search.php?s=${searchInput}`);
    const nameData = await nameResponse.json();
    if (Object.values(nameData)[0] !== null) {
      dispatch(fetchData(nameData));
    } else {
      global.alert(warning);
    }
  };

  const fetchByFirstLetter = async (db) => {
    const firstLetterResponse = await fetch(`https://www.${db}.com/api/json/v1/1/search.php?f=${searchInput}`);
    const firstLetterData = await firstLetterResponse.json();
    if (Object.values(firstLetterData)[0] !== null) {
      dispatch(fetchData(firstLetterData));
    } else {
      global.alert(warning);
    }
  };

  const fetchFoodsOrDrinks = async (db) => {
    if (searchFilter === 'ingredients') {
      fetchByIngredients(db);
    } else if (searchFilter === 'name') {
      fetchByName(db);
    } else if (searchFilter === 'first-letter'
      && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      fetchByFirstLetter(db);
    }
  };

  const getData = () => {
    if (title === 'Foods' || title === 'Explore Nationalities') {
      fetchFoodsOrDrinks('themealdb');
    } else if (title === 'Drinks') {
      fetchFoodsOrDrinks('thecocktaildb');
    }
  };

  const handleFunctions = {
    setSearchFilter,
    getData,
  };

  return (
    <header data-testid="header">
      <div className="header-container">
        <input
          type="image"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Logo"
          onClick={ goToProfile }
        />
        <p data-testid="page-title">
          { title }
        </p>

        { showSearchIcon && (
          <input
            type="image"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search Logo"
            onClick={ () => setShowInput(!showInput) }
          />
        ) }
      </div>

      { showInput && (
        <div>
          <RadioButtons handleFunctions={ handleFunctions } />
          <input
            data-testid="search-input"
            type="text"
            id="search-input"
            onChange={ ({ target }) => setSearchInput(target.value) }
          />
        </div>
      ) }
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
