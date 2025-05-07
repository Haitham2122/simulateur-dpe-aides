import React, { useState } from 'react';
import { EtapeProps, EtatClimatisation, TypeVentilation } from '../types/types';
import RefreshIcon from './icons/RefreshIcon';
import './Etape5_Chauffage.css'; // Réutilisation du style

interface OptionProps {
  selected: boolean;
  value: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

// Icônes
const ClimOuiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 10L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 10L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 10L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 10L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ClimNonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 10L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 10L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const VentilationAucuneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2"/>
    <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const VentilationSimpleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 12H16" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 8L16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VentilationDoubleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 10H12" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 14H12" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 10L12 10L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 14L12 14L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Option: React.FC<OptionProps> = ({ selected, value, label, icon, onClick }) => {
  return (
    <div 
      className={`option-button ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="option-icon">
        {icon}
      </div>
      <span className="option-label">{label}</span>
    </div>
  );
};

const Etape6_ClimVentilation: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
  const [climatisation, setClimatisation] = useState<EtatClimatisation>(data?.climatisation || null);
  const [ventilation, setVentilation] = useState<TypeVentilation>(data?.ventilation || null);
  const [showVentilation, setShowVentilation] = useState<boolean>(data?.climatisation === 'non');

  // Gérer la sélection de climatisation
  const handleClimatisationChange = (value: EtatClimatisation) => {
    setClimatisation(value);
    if (value === 'non') {
      setShowVentilation(true);
    } else {
      setShowVentilation(false);
      setVentilation(null);
      submitData(value, null);
    }
  };

  // Gérer la sélection de ventilation
  const handleVentilationChange = (value: TypeVentilation) => {
    setVentilation(value);
    submitData('non', value);
  };

  // Réinitialiser climatisation
  const resetClimatisation = () => {
    setClimatisation(null);
    setShowVentilation(false);
    setVentilation(null);
  };

  // Réinitialiser ventilation
  const resetVentilation = () => {
    setVentilation(null);
  };

  // Soumettre les données
  const submitData = (clim: EtatClimatisation, vent: TypeVentilation | null) => {
    onComplete({
      climatisation: clim,
      ventilation: vent
    });
  };

  return (
    <div className="etape-container">
      <div className="question-block">
        <h2>Votre logement est-il équipé d'une climatisation ?</h2>
        
        {!climatisation ? (
          <div className="options-grid options-grid-binary">
            <Option
              selected={climatisation === 'oui'}
              value="oui"
              label="Oui"
              icon={<ClimOuiIcon />}
              onClick={() => handleClimatisationChange('oui')}
            />
            
            <Option
              selected={climatisation === 'non'}
              value="non"
              label="Non"
              icon={<ClimNonIcon />}
              onClick={() => handleClimatisationChange('non')}
            />
          </div>
        ) : (
          <div className="selected-option-container">
            <div className="selected-option-icon">
              {climatisation === 'oui' ? <ClimOuiIcon /> : <ClimNonIcon />}
            </div>
            <div className="selected-option-content">
              <div className="selected-option-label">
                {climatisation === 'oui' ? 'Oui' : 'Non'}
              </div>
            </div>
            <div className="selected-option-action">
              <button 
                type="button" 
                className="reset-selected-button"
                onClick={resetClimatisation}
              >
                <RefreshIcon />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {showVentilation && (
        <div className="question-block">
          <h2>Quel type de ventilation avez-vous ?</h2>
          
          {!ventilation ? (
            <div className="options-grid">
              <Option
                selected={ventilation === 'aucune'}
                value="aucune"
                label="Pas de VMC"
                icon={<VentilationAucuneIcon />}
                onClick={() => handleVentilationChange('aucune')}
              />
              
              <Option
                selected={ventilation === 'simple_flux'}
                value="simple_flux"
                label="VMC simple flux"
                icon={<VentilationSimpleIcon />}
                onClick={() => handleVentilationChange('simple_flux')}
              />
              
              <Option
                selected={ventilation === 'double_flux'}
                value="double_flux"
                label="VMC double flux"
                icon={<VentilationDoubleIcon />}
                onClick={() => handleVentilationChange('double_flux')}
              />
            </div>
          ) : (
            <div className="selected-option-container">
              <div className="selected-option-icon">
                {ventilation === 'aucune' ? <VentilationAucuneIcon /> : 
                 ventilation === 'simple_flux' ? <VentilationSimpleIcon /> : 
                 <VentilationDoubleIcon />}
              </div>
              <div className="selected-option-content">
                <div className="selected-option-label">
                  {ventilation === 'aucune' ? 'Pas de VMC' : 
                   ventilation === 'simple_flux' ? 'VMC simple flux' : 
                   'VMC double flux'}
                </div>
              </div>
              <div className="selected-option-action">
                <button 
                  type="button" 
                  className="reset-selected-button"
                  onClick={resetVentilation}
                >
                  <RefreshIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Etape6_ClimVentilation; 