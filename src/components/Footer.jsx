import React from 'react';
import { Link } from 'react-router-dom';
import mealImg from '../images/mealIcon.svg';
import drink from '../images/drink.svg';


export default function Footer() {
  return (
    <footer data-testid="footer" className="row fixed-bottom justify-content-center py-1" style={{background: '#41197F'}}>
      <Link to="/drinks" className='col-6 row justify-content-center'>
        <img
          src={ drink }
          alt="Icone de perfil"
          data-testid="drinks-bottom-btn"
          className="col-3"
        />
      </Link>
      <Link to="/meals" className='col-6 row justify-content-center'>
        <img
          src={ mealImg }
          alt="Icone de perfil"
          data-testid="meals-bottom-btn"
          className="col-4"
        />
      </Link>
    </footer>
  );
}
