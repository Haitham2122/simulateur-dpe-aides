import React from 'react';
import { Link } from 'react-router-dom';
import './Accueil.css';

const Accueil: React.FC = () => {
  return (
    <div className="accueil">
      <h1>Bienvenue sur notre plateforme de simulation</h1>
      <div className="simulateurs-options">
        <div className="simulateur-option">
          <h2>DPE</h2>
          <p>Simulateur de diagnostic de performance énergétique</p>
          <Link to="/dpe" className="simulateur-button">Accéder</Link>
        </div>
        <div className="simulateur-option">
          <h2>Aides financières</h2>
          <p>Simulateur d'aides aux travaux de rénovation énergétique</p>
          <Link to="/aides" className="simulateur-button">Accéder</Link>
        </div>
      </div>
    </div>
  );
};

export default Accueil; 