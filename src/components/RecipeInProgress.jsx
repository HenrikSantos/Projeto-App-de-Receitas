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
export default function RecipeInProgress({ apiType, id }) {
  const history = useHistory();
  const { singleData } = useContext(MyContext);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const nameApiType = apiType === 'Meal' ? 'meals' : 'drinks';

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }

    // done Recipes
    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }, [doneRecipes]);

  // inProgress
  useEffect(() => {
    const singleDataEntries = Object.entries(singleData[0]);
    const entriesIngredient = singleDataEntries
      .filter((el) => el[0].includes('strIngredient') && el[1]);
    const thisIngredient = entriesIngredient.map((el) => [el[1], false]);

    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const inProgressItens = { [id]: thisIngredient };
      console.log('entrou no if quando nao tem local storage', inProgressItens);
      setIngredients(thisIngredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressItens));
    }

    if (JSON.parse(localStorage.getItem('inProgressRecipes'))[id]) {
      const localInProcessRecipes = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      setIngredients(localInProcessRecipes);
      console.log('entrou no if quando tem local storage e tem id');
    } else {
      const oldLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newLocalStorage = {
        ...oldLocal,
        [id]: thisIngredient,
      };
      console.log('entrou no if quando tem local storage e nao tem id');
      setIngredients(newLocalStorage);
    }
  }, [singleData]);

  const handleShareButton = () => {
    setShowCopyMessage(true);
    copy(`http://localhost:3000/${nameApiType}/${id}`);
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

  const handleSaveDoneRecipe = () => {
    console.log(singleData[0]);
    const saveDoneRecipes = [...doneRecipes, {
      doneDate: new Date().toJSON(),
      id: singleData[0][`id${apiType}`],
      type: nameApiType.slice(0, menosUm),
      nationality: singleData[0].strArea ? singleData[0].strArea : '',
      category: singleData[0].strCategory,
      alcoholicOrNot: singleData[0].strAlcoholic ? singleData[0].strAlcoholic : '',
      name: singleData[0][`str${apiType}`],
      image: singleData[0][`str${apiType}Thumb`],
      tags: singleData[0].strTags ? singleData[0].strTags.split(',') : [],
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(saveDoneRecipes));
    history.push('/done-recipes');
  };

  const markHasCompleted = (index) => {
    const oldInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newArr = [...ingredients[id]];
    newArr[index][1] = !newArr[index][1];
    const newInProgress = {
      ...oldInProgress,
      [id]: newArr,
    };
    setIngredients(newInProgress);
  };
  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(ingredients));
  }, [ingredients]);

  const validateLogin = () => ingredients[id]?.every((el) => el[1]);

  return (
    <div>
      <Header hasSearchIcon={ false } />
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
              <button type="button" data-testid="share-btn" onClick={ handleShareButton }>
                <img src={ shareImg } alt="compartilhar" />
              </button>

              <button type="button" onClick={ handleFavoriteButton }>
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
            { ingredients[id]?.map((el, index) => (
              <div key={ el[0] }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  className={ el[1] ? 'lineThrough' : '' }
                  htmlFor={ el[0] }
                >
                  <input
                    onClick={ () => markHasCompleted(index) }
                    type="checkbox"
                    checked={ el[1] }
                    id={ el[0] }
                    name={ el[0] }
                  />
                  {el[0]}
                </label>
              </div>
            ))}
            <p data-testid="instructions">{ singleData?.[0].strInstructions }</p>
          </div>
          <div className="row mb-5">
            <button
              type="button"
              className="col-10 mx-auto btn btn-danger"
              data-testid="finish-recipe-btn"
              disabled={ !validateLogin() }
              onClick={ handleSaveDoneRecipe }
            >
              Finish Recipe
            </button>
          </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  apiType: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  id: PropTypes.string,
}.isRequires;
