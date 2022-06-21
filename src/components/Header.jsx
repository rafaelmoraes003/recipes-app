import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RadioButtons from './RadioButtons';

const Header = ({ title, showSearchIcon }) => {
  const [showInput, setShowInput] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);
  const history = useHistory();

  const goToProfile = () => {
    history.push('/profile');
  };

  const fetchFoodsOrDrinks = async (type) => {
    if (searchFilter === 'ingredients') {
      const ingredientResponse = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const ingredientData = await ingredientResponse.json();
      setData(ingredientData);
    } else if (searchFilter === 'name') {
      const nameResponse = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=${searchInput}`);
      const nameData = await nameResponse.json();
      setData(nameData);
    } else if (searchFilter === 'first-letter' && searchInput.length === 1) {
      const firstLetterResponse = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?f=${searchInput}`);
      const firstLetterData = await firstLetterResponse.json();
      setData(firstLetterData);
    } else {
      global.alert('Your search must have only 1 (one) character');
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
            data-testId="search-input"
            type="text"
            id="search-input"
            onChange={ ({ target }) => setSearchInput(target.value) }
          />
          <p style={ { display: 'none' } }>{JSON.stringify(data)}</p>
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
