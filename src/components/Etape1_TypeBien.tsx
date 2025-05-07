import React, { useState } from 'react';
import { EtapeProps, TypeBien } from '../types/types';
import HouseIcon from './icons/HouseIcon';
import ApartmentIcon from './icons/ApartmentIcon';
import RefreshIcon from './icons/RefreshIcon';

const Etape1_TypeBien: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
  const [selection, setSelection] = useState<TypeBien>(data?.typeBien || null);

  // Handle option selection
  const handleSelect = (typeBien: TypeBien) => {
    setSelection(typeBien);
    
    // Automatically advance to next step
    onComplete({ typeBien });
  };

  // Reset selection
  const handleReset = () => {
    setSelection(null);
  };

  return (
    <div className="etape-container">
      <h2>L'estimation concerne-t-elle un appartement ou une maison ?</h2>
      
      {!selection ? (
        // Afficher toutes les options si aucune n'est sélectionnée
        <div className="options-grid">
          <div 
            className={`option-button ${selection === 'maison' ? 'selected' : ''}`}
            onClick={() => handleSelect('maison')}
          >
            <div className="option-icon">
              <HouseIcon className="option-icon" />
            </div>
            <span className="option-label">Maison</span>
          </div>
          
          <div 
            className={`option-button ${selection === 'appartement' ? 'selected' : ''}`}
            onClick={() => handleSelect('appartement')}
          >
            <div className="option-icon">
              <ApartmentIcon className="option-icon" />
            </div>
            <span className="option-label">Appartement</span>
          </div>
        </div>
      ) : (
        // Afficher uniquement l'option sélectionnée
        <div className="selected-option-container">
          <div className="selected-option-icon">
            {selection === 'maison' ? (
              <HouseIcon className="option-icon" />
            ) : (
              <ApartmentIcon className="option-icon" />
            )}
          </div>
          <div className="selected-option-content">
            <div className="selected-option-label">
              {selection === 'maison' ? 'Maison' : 'Appartement'}
            </div>
          </div>
          <div className="selected-option-action">
            <button 
              type="button" 
              className="reset-selected-button"
              onClick={handleReset}
              aria-label="Modifier la sélection"
            >
              <RefreshIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Etape1_TypeBien; 