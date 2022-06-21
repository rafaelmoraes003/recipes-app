import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => {
  const [showInput, setShowInput] = useState(false);

  const history = useHistory();
  const onClickProfile = () => {
    history.push('/profile');
  };
  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ onClickProfile }
      >
        <img src={ profileIcon } alt="Botão com icon de pergil" />
      </button>
      {
        showInput && <h1 data-testid="page-title">Foods</h1>
      }

      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setShowInput(!showInput) }
      >
        <img src={ searchIcon } alt="Botão com icon de lupa/pesquisa" />
      </button>
    </header>
  );
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

};

export default Header;
