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
    <header className="sticky-top bg-warning text-dark pt-2 pb-1 mx-auto">
      <div className="row justify-content-around ">
        <div className="col-4 fs-5 row">
          <img className="col-6" src={ headerImg } alt="imagem exemplo" />
          <h3 className="col-2">RECIPES app</h3>
        </div>
        {
          (hasProfileIcon) && (
            <div className="col-3 row align-content-around">
              <Link to="/profile" className="col-10 ms-2 btn btn-danger">
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
            <div className="col-3 row justify-content-end mx-0 align-content-around">
              <button
                className="col-10 btn btn-danger"
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

      {
        (searchInput) && (
          <SearchBar title={ title }/>
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
