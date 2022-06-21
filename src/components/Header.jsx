import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => {
  const history = useHistory();
  const onClickProfile = () => {
    console.log('entrei');
    history.push('/profile');
  };
  const onClickCount = () => {
    console.log('entrei');
  };
  return (
    <div>

      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ onClickProfile }
      >
        <img src={ profileIcon } alt="Botão com icon de pergil" />
      </button>
      <input data-testid="search-input" />

      <h1 data-testid="page-title">Foods</h1>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ onClickCount }
      >
        <img src={ searchIcon } alt="Botão com icon de lupa/pesquisa" />
      </button>
    </div>
  );
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

};

export default Header;
