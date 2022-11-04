import React from 'react';
import { Link } from 'react-router-dom';
import mealImg from '../images/mealIcon.svg';
import drink from '../images/drink.svg';


export default function Footer() {
  return (
    <footer data-testid="footer" className="row relative-lg-bottom fixed-bottom justify-content-center py-3" style={{background: '#41197F'}}>
      <Link to="/drinks" className='col-6 row justify-content-center'>
        <div className="col-4 col-lg-2">
          <img
            src={ drink }
            alt="Icone de perfil"
            data-testid="drinks-bottom-btn"
            style={{width: '40%'}}
          />
        </div>
      </Link>
      <Link to="/meals" className='col-6 row justify-content-center'>
        <div className="col-4 col-lg-2">
          <img
            src={ mealImg }
            alt="Icone de perfil"
            data-testid="meals-bottom-btn"
            style={{width: '50%'}}
          />
        </div>
      </Link>
    </footer>
  );
}
