import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import { saveUser } from '../redux/actions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const enabelButton = () => {
    const MIN_CHAR = 6;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && password.length > MIN_CHAR;
  };

  const loginFunction = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    const userEmail = {
      email,
    };
    dispatch(saveUser(email));
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('/foods');
  };

  return (
    <form className="login-container">
      <Input
        testId="email-input"
        id="email"
        type="text"
        onChange={ setEmail }
        labelText="E-mail"
        value={ email }
      />

      <Input
        testId="password-input"
        id="password"
        type="password"
        onChange={ setPassword }
        labelText="Password"
        value={ password }
      />

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !enabelButton() }
        onClick={ loginFunction }
      >
        Login
      </button>
    </form>
  );
};

export default Login;
