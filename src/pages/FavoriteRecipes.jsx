import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const time = 3000;
export default function FavoriteRecipes() {
  const history = useHistory();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [backupfavoriteRecipes, setBackupFavoriteRecipes] = useState([]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  useEffect(() => {
    setBackupFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const handleShareButton = (el) => {
    setShowCopyMessage(true);
    copy(`http://localhost:3000/${el.type}s/${el.id}`);
    setTimeout(() => setShowCopyMessage(false), time);
  };

  const handleFilterByAll = () => {
    setFavoriteRecipes(backupfavoriteRecipes);
  };

  const handleFilterByMeal = () => {
    setFavoriteRecipes(backupfavoriteRecipes.filter((el) => el.type === 'meal'));
  };

  const handleFilterByDrink = () => {
    setFavoriteRecipes(backupfavoriteRecipes.filter((el) => el.type === 'drink'));
  };

  const goToDetailPage = (el) => {
    history.push(`/${el.type}s/${el.id}`);
  };

  const unfavoriteRecipe = (el) => {
    const newFiltred = favoriteRecipes.filter((thisElement) => thisElement.id !== el.id);
    setBackupFavoriteRecipes(newFiltred);
    setFavoriteRecipes(newFiltred);
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  return (
    <div className='row align-items-start'>
      <Header title="Favorite Recipes" hasSearchIcon={ false } />
      <div className="row justify-content-center my-4 col-12 col-lg-3">
        <h3>Filter:</h3>
        <button
          className="btn btn-danger col-10 my-2"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleFilterByAll }
        >
          All
        </button>
        <button
          className="btn btn-danger col-10 my-2"
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ handleFilterByMeal }
        >
          Meals
        </button>
        <button
          className="btn btn-danger col-10 my-2"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleFilterByDrink }
        >
          Driks
        </button>
      </div>
      <div className='col-12 col-lg-9 row mt-3 justify-content-evenly'>
        { showCopyMessage && (
          <p>Link copied!</p>
        )}
        {favoriteRecipes?.map((el, index) => (
          <div key={ el.name } className="row border rounded col-12 col-md-5">
            <button type="button" className="col-6" onClick={ () => goToDetailPage(el) }>
              <img
                src={ el.image }
                data-testid={ `${index}-horizontal-image` }
                alt="imagem da receita"
                />
            </button>
              <div className="col-6">
                <p data-testid={ `${index}-horizontal-name`} className="text-center fs-2" ><b>{el.name}</b></p>

                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${el.category}`}
                </p>
                
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${el.nationality}`}
                </p>
                <p data-testid={ `${index}-horizontal-top-text` }>{el.alcoholicOrNot}</p>
                <button
                  type="button"
                  onClick={ () => handleShareButton(el) }
                  className="fav-and-share"
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="compartilhar"
                    />
                </button>
                <button
                  type="button"
                  onClick={ () => unfavoriteRecipe(el) }
                  className="fav-and-share"
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="favoritar"
                  />
                </button>
              </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
