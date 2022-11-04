import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import shareImg from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';

const time = 3000;
const menosUm = -1;
export default function RecipeDetails({ apiType, id }) {
  const history = useHistory();
  const { singleData, recomendation } = useContext(MyContext);
  const [doneRe, setDoneRecipes] = useState([]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [inProgress, setInProgress] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  const other = apiType === 'Meal' ? 'Drink' : 'Meal';
  const nameApiType = apiType === 'Meal' ? 'meals' : 'drinks';
  let arrMeasure = [];
  let arrIngredient = [];

  if (singleData?.[0]) {
    const singleDataKeys = Object.entries(singleData[0]);
    const entriesIngredient = singleDataKeys
      .filter((el) => el[0].includes('strIngredient') && el[1]);
    arrIngredient = entriesIngredient.map((el) => el[1]);
    const entriesMeasure = singleDataKeys
      .filter((el) => el?.[0].includes('strMeasure') && el[1]);
    arrMeasure = entriesMeasure.map((el) => el[1]);
  }
  let ytLink = '';

  if (singleData?.[0]?.strYoutube) {
    const arrYtLink = singleData[0]?.strYoutube.split('/');
    ytLink = `${arrYtLink[0] + arrYtLink[2]}/embed/${arrYtLink[3]}`;
  }

  const handleShareButton = () => {
    setShowCopyMessage(true);
    copy(`http://localhost:3000${history.location.pathname}`);
    setTimeout(() => setShowCopyMessage(false), time);
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleFavoriteButton = () => {
    if ((favoriteRecipes.some((el) => el.id === id))) {
      const newFiltred = favoriteRecipes.filter((el) => el.id !== id);
      setFavoriteRecipes(newFiltred);
    } else {
      const saveFavRecipe = [...favoriteRecipes, {
        id: singleData[0][`id${apiType}`],
        type: nameApiType.slice(0, menosUm),
        nationality: singleData[0].strArea ? singleData[0].strArea : '',
        category: singleData[0].strCategory,
        alcoholicOrNot: singleData[0].strAlcoholic ? singleData[0].strAlcoholic : '',
        name: singleData[0][`str${apiType}`],
        image: singleData[0][`str${apiType}Thumb`],
      }];
      setFavoriteRecipes(saveFavRecipe);
    }
  };

  return (
    <div className="mb-2">
      <Header hasSearchIcon={ false } />
      {singleData?.[0] && (
        <div>
          <div className="recipe-container">
            <img
              data-testid="recipe-photo"
              src={ singleData?.[0][`str${apiType}Thumb`] }
              alt={ singleData?.[0][`id${apiType}`] }
              className="recipe-detail-img"
            />
            <h3 data-testid="recipe-title" className="centered">{singleData?.[0][`str${apiType}`]}</h3>
            <h3 data-testid="recipe-category" className="top-left">
              {singleData?.[0].strCategory}
              <br/>
              {singleData?.[0].strAlcoholic}
            </h3>
            <div className="top-right">
              <button type="button" className="fav-and-share" data-testid="share-btn" onClick={ handleShareButton }>
                <img src={ shareImg } alt="compartilhar" />
              </button>

              <button type="button" className="fav-and-share" onClick={ handleFavoriteButton }>
                <img
                  data-testid="favorite-btn"
                  src={
                    (favoriteRecipes
                      .some((el) => el.id === id)) ? blackHeartIcon : whiteHeartIcon
                    }
                  alt="favoritar"
                />
              </button>
              { showCopyMessage && (
                <p>Link copied!</p>
                )}
            </div>
            <h3 data-testid="recipe-category" className="top-right mt-5">{singleData?.[0].strAlcoholic}</h3>
          </div>
          <div className="container">
            <div>
              <h3>Ingredients:</h3>
              <ul>
                { arrIngredient.map((el, index) => (
                  <li key={ el } data-testid={ `${index}-ingredient-name-and-measure` }>
                    {`${el} ${arrMeasure[index] ? arrMeasure[index] : ''}`}
                  </li>
                ))}
              </ul>
            </div>
            <h3>Instructions: </h3>
            <p data-testid="instructions" className='instructions'>{ singleData?.[0].strInstructions }</p>
          </div>
          {
            apiType === 'Meal' && (
              <div className="row container mx-auto mb-3">
                <h3>Video:</h3>
                <iframe
                  className='col-12'
                  data-testid="video"
                  title="receita"
                  width="420"
                  height="315"
                  src={ ytLink }
                />
              </div>
            )
          }
        </div>
      )}
      <h3>{other} Sugestions:</h3>
      <div className="carousel">
        {
          recomendation?.map((item, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              className="item"
              key={ item[`str${other}`] }
            >
              <img
                src={ item[`str${other}Thumb`] }
                alt={ item[`str${other}`] }
              />
              <h3 data-testid={ `${index}-recommendation-title` }>
                { item[`str${other}`] }
              </h3>
            </div>
          ))
        }
      </div>
      <div className="row mt-4">
      {
        !doneRe?.some((el) => el?.id === singleData?.[0]?.[`id${apiType}`]) && (
          <button
            type="button"
            className="col-10 mx-auto mb-5 btn btn-danger"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/${nameApiType}/${id}/in-progress`) }
            >
            {
              inProgress?.[nameApiType]?.[id] ? (
                'Continue Recipe'
                ) : (
                  'Start Recipe'
                  )
            }
          </button>
        )
      }
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  apiType: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  id: PropTypes.string,
}.isRequires;
