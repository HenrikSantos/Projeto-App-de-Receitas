import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [email, setEmail] = useState([]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    }
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    setEmail(localStorageUser);
  }, []);

  const cleanLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="container">
      <h3>Email:</h3>
      <p data-testid="profile-email">{email.email}</p>
      <div className="row">
        <Link className="col-10 mx-auto btn btn-primary my-1" to="/done-recipes" data-testid="profile-done-btn">
            Done Recipes
        </Link>
        <Link className="col-10 mx-auto btn btn-primary my-1" data-testid="profile-favorite-btn" to="/favorite-recipes">
            Favorite Recipes
        </Link>
        <Link className="col-10 mx-auto btn btn-primary my-1"
          onClick={ cleanLocalStorage }
          type="button"
          data-testid="profile-logout-btn"
          to="/"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
