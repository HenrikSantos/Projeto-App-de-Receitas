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
      className="row p-2 m-2 justify-content-center"
      style={{ background: '#41197F', color: 'white', borderRadius: '7px', border: 'solid purple 1px' }}
    >
      {
        (title) && (
          <h1 data-testid="page-title" className="ms-2">{title}</h1>
        )
      }
      <div className="col-10 justify-content-center align-content-center row">
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
      </div>
      <div className="col-10 mx-auto">
        <label className="mx-3" htmlFor="name">
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
        <label className="mx-3" htmlFor="ingredient">
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
        <label className="mx-3" htmlFor="firstLetter">
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
  );
}
