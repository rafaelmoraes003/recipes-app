import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RadioButtons from './RadioButtons';
import { fetchData } from '../redux/actions/fetchDataACTION';

const Header = ({ title, showSearchIcon }) => {
  const [showInput, setShowInput] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const warning = 'Sorry, we haven\'t found any recipes for these filters.';

  const goToProfile = () => {
    history.push('/profile');
  };

  const fetchByIngredients = async (db) => {
    try {
      const ingredientResponse = await fetch(`https://www.${db}.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const ingredientData = await ingredientResponse.json();
      if (Object.values(ingredientData)[0] !== null) {
        console.log(Object.values(ingredientData));
        dispatch(fetchData(ingredientData));
      } else {
        global.alert(warning);
      }
    } catch (error) {
      console.log(error);
      global.alert(warning);
    }
  };

  const fetchByName = async (db) => {
    try {
      const nameResponse = await fetch(`https://www.${db}.com/api/json/v1/1/search.php?s=${searchInput}`);
      const nameData = await nameResponse.json();
      if (Object.values(nameData)[0] !== null) {
        console.log(Object.values(nameData));
        dispatch(fetchData(nameData));
      } else {
        global.alert(warning);
      }
    } catch (error) {
      console.log(error);
      global.alert(warning);
    }
  };

  const fetchByFirstLetter = async (db) => {
    try {
      const firstLetterResponse = await fetch(`https://www.${db}.com/api/json/v1/1/search.php?f=${searchInput}`);
      const firstLetterData = await firstLetterResponse.json();
      if (Object.values(firstLetterData)[0] !== null) {
        console.log(Object.values(firstLetterData));
        dispatch(fetchData(firstLetterData));
      } else {
        global.alert(warning);
      }
    } catch (error) {
      console.log(error);
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
    if (title === 'Foods') {
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
      <input
        type="image"
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile Logo"
        onClick={ goToProfile }
      />

      <h1 data-testid="page-title">
        { title }
      </h1>

      { showSearchIcon && (
        <input
          type="image"
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="Search Logo"
          onClick={ () => setShowInput(!showInput) }
        />
      ) }

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
