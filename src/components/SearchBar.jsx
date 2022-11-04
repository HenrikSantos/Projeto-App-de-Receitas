import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function SearchBar({ title }) {
  const {
    fetchSearchAPI,
    setNameFilter,
    setFilterType,
    nameFilter,
  } = useContext(MyContext);

  const handleRadioChange = ({ target: { value } }) => {
    setFilterType(value);
  };

  return (
    <div
      className="row justify-content-center my-2 py-2 col-lg-10 py-lg-4"
      style={{ background: '#41197F', color: 'white', borderRadius: '7px', border: 'solid purple 1px' }}
    >
      {
        (title) && (
          <h1 data-testid="page-title" className="ms-1 fs-1">{title}:</h1>
        )
      }
      <div className="col-12 justify-content-center align-content-center row">
        <input
          type="text"
          placeholder="Search"
          data-testid="search-input"
          value={ nameFilter }
          onChange={ (event) => setNameFilter(event.target.value) }
          className="my-1 col-12 form-control"
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          className="btn btn-danger"
          onClick={ () => fetchSearchAPI() }
        >
          Search
        </button>
      <div className="col-12 fs-3">
        <label className="ms-1 col-12" htmlFor="name">
          <input
            type="radio"
            name="radioFilter"
            id="name"
            value="name"
            onClick={ (event) => handleRadioChange(event) }
            data-testid="name-search-radio"
            />
            &nbsp;Name
        </label>
        <label className="ms-1 col-12" htmlFor="ingredient">
          <input
            type="radio"
            name="radioFilter"
            id="ingredient"
            value="ingredient"
            onClick={ (event) => handleRadioChange(event) }
            data-testid="ingredient-search-radio"
            />
            &nbsp;Ingredient
        </label>
        <label className="ms-1 col-12" htmlFor="firstLetter">
          <input
            type="radio"
            name="radioFilter"
            value="firstLetter"
            id="firstLetter"
            onClick={ (event) => handleRadioChange(event) }
            data-testid="first-letter-search-radio"
            />
            &nbsp;First letter
        </label>
      </div>
      </div>      
    </div>
  );
}
