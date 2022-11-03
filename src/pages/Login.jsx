import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateLogin = () => {
    const PASSWORD_MIN_SIZE = 7;
    const vEmail = /\S+@\S+\.\S+/;
    const isEmailValid = email.match(vEmail) != null;
    const isPasswordValid = password.length >= PASSWORD_MIN_SIZE;
    return isEmailValid && isPasswordValid;
  };

  const handleChange = ({ target }, func) => {
    const { value } = target;
    func(value);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <>
      <input
        type="text"
        placeholder="email"
        data-testid="email-input"
        value={ email }
        onChange={ (event) => handleChange(event, setEmail) }
      />
      <input
        type="password"
        placeholder="password"
        data-testid="password-input"
        value={ password }
        onChange={ (event) => handleChange(event, setPassword) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !validateLogin() }
        onClick={ handleClick }
      >
        Enter
      </button>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
