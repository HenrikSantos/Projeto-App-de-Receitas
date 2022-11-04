import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Filter from './Filter';

export default function Recipes() {
  const history = useHistory();
  const { data, apiType, categoriesData } = useContext(MyContext);
  const apiTypeUp = apiType[0].toUpperCase() + apiType.substring(1);
  const changeToDetail = (recipe) => {
    history.push(`/${apiType}s/${recipe[`id${apiTypeUp}`]}`);
  };
  return (
    <div>
      <Filter />
      <div className="row justify-content-between container mx-auto m-3 mb-5">
        {
          categoriesData[0] ? (
            categoriesData?.map((recipe, i) => (
              <button
                type="button"
                className="mb-5 mb-lg-5 col-5 col-lg-3 m-lg-3 recipe-item"
                data-testid={ `${i}-card-button` }
                onClick={ () => changeToDetail(recipe) }
                key={ recipe[`id${apiTypeUp}`] }
              >
                <img
                  data-testid={ `${i}-card-img` }
                  src={ recipe[`str${apiTypeUp}Thumb`] }
                  alt={ recipe[`id${apiTypeUp}`] }
                  className="recipe-img"
                />
                <h3 data-testid={ `${i}-card-name` }>{recipe[`str${apiTypeUp}`]}</h3>
              </button>
            ))
          ) : (
            data?.map((recipe, index) => (
              <button
                className="mb-5 mb-lg-5 col-5 col-lg-3 m-lg-3 recipe-item"
                type="button"
                data-testid={ `${index}-card-button` }
                onClick={ () => changeToDetail(recipe) }
                key={ recipe[`id${apiTypeUp}`] }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe[`str${apiTypeUp}Thumb`] }
                  alt={ recipe[`id${apiTypeUp}`] }
                  className="recipe-img"
                />
                <h3 data-testid={ `${index}-card-name` }>{recipe[`str${apiTypeUp}`]}</h3>
              </button>
            ))
            )
          }
        </div>
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string,
}.isRequired;
