import PropTypes from 'prop-types';
import React, { useState } from 'react';
import tomato from '../images/tomato.svg';
import icon from '../images/icon.svg';

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
    <div className="row justify-content-center">
      <div  className="mt-5 col-12 row justify-content-center">
        <img src={ icon } style={{width: '30rem'}} alt="icone" />
      </div>
      <div className="row col-sm col-sm-5 justify-content-center">
        <input
          className="col-10 col-sm-12 text-sm-center rounded"
          type="text"
          placeholder="Email"
          data-testid="email-input"
          value={ email }
          onChange={ (event) => handleChange(event, setEmail) }
        />
        <input
          className="col-10 mt-2 col-sm-12 text-sm-center rounded"
          type="password"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          onChange={ (event) => handleChange(event, setPassword) }
        />
        <button
          className="col-10 mt-2 btn col-sm-12 text-sm-center btn-primary"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validateLogin() }
          onClick={ handleClick }
          >
          Enter
        </button>
      </div>
      <div className="col-12 d-sm-none">
      <img src={ tomato } alt="tomato" className="col-12" />
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
