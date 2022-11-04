import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import headerImg from '../images/headerImg.svg';

function Header({
  title,
  hasSearchIcon = true,
  hasProfileIcon = true,
}) {
  const [searchInput, setSearchInput] = useState(false);
  return (
    <header className="sticky-top bg-warning text-dark pt-2 pb-1 pt-sm-0 justify-content-center row">
      <div className="row justify-content-evenly pt-2">
        <div className="col-4 row">
          <img className="col-8 col-sm-5 col-lg-2" src={ headerImg } alt="imagem exemplo" />
          <div className="col-4">
            <h1 className="col-12 d-none d-lg-inline">Recipes App</h1>
          </div>
        </div>
        <div className="col-8 row justify-content-end">
          {
            (hasProfileIcon) && (
              <div className="col-5 col-lg-2 row align-content-around">
                <Link to="/profile" className="col-10 ms-2 btn btn-danger py-2">
                  <img
                    src={ profileIcon }
                    alt="Icone de perfil"
                    data-testid="profile-top-btn"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Link>
              </div>
            )
          }

          {
            (hasSearchIcon) && (
              <div className="col-5 col-lg-2 row justify-content-end mx-0 align-content-around">
                <button
                  className="col-10 btn btn-danger py-2"
                  type="button"
                  onClick={ () => setSearchInput((prevState) => !prevState) }
                >
                  <img
                    src={ searchIcon }
                    alt="Icone de pesquisa"
                    data-testid="search-top-btn"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </button>
              </div>
            )
          }
        </div>
      </div>

      {
        (searchInput) && (
          <div className="row justify-content-center container my-2">
              <SearchBar title={ title }/>
          </div>
        )
      }

    </header>
  );
}

Header.propTypes = {
  hasProfileIcon: PropTypes.bool,
  hasSearchIcon: PropTypes.bool,
  title: PropTypes.string,
}.isRequired;

export default Header;
