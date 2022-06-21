import React, { useState } from 'react';
import Input from '../components/Input';
import Header from '../components/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const enabelButton = () => {
    const MIN_CHAR = 6;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && password.length > MIN_CHAR;
  };

  return (
    <div>
      <Header />
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
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
