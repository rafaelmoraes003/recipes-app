import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Input from './Input';

const Header = ({ title, showSearchIcon }) => {
  const [showInput, setShowInput] = useState(false);
  const history = useHistory();

  const goToProfile = () => {
    history.push('/profile');
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
        <Input
          testId="search-input"
          type="text"
          id="search-input"
        />
      ) }
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
