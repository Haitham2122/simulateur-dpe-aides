import React, { useState } from 'react';
import { EtapeProps, EnergieChauffage, TypeChaudiereGaz, TypeChauffageBois, TypePAC } from '../types/types';
import RefreshIcon from './icons/RefreshIcon';
import './Etape5_Chauffage.css';

// Interfaces pour les options
interface EnergieOption {
  value: EnergieChauffage;
  label: string;
  icon: React.ReactNode;
}

interface ChaudiereGazOption {
  value: TypeChaudiereGaz;
  label: string;
}

interface ChauffageBoisOption {
  value: TypeChauffageBois;
  label: string;
}

interface PACOption {
  value: TypePAC;
  label: string;
}

// Icônes pour les énergies de chauffage
const ElectriqueIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GazIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6C9.79086 6 8 7.79086 8 10C8 11.5217 8.85099 12.8702 10.1277 13.5279C10.7389 13.8431 11 14.3244 11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15C13 14.3244 13.2611 13.8431 13.8723 13.5279C15.149 12.8702 16 11.5217 16 10C16 7.79086 14.2091 6 12 6Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const FioulIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M11.15 7C11.15 7 8 10.6 8 13.5C8 15.52 9.73 17.14 11.875 17.14C14.02 17.14 15.75 15.52 15.75 13.5C15.75 10.6 12.6 7 12.6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BoisIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 15.9249 6 15.9249 6 10.5C6 6.35786 9.35786 3 10.5 3C11.6421 3 18 6.35786 18 10.5C18 15.9249 12 15.9249 12 22Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const PACIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 12H15" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Options pour l'énergie principale de chauffage
const energieOptions: EnergieOption[] = [
  { value: 'electrique', label: 'Électrique', icon: <ElectriqueIcon /> },
  { value: 'gaz', label: 'Gaz', icon: <GazIcon /> },
  { value: 'fioul', label: 'Fioul', icon: <FioulIcon /> },
  { value: 'bois', label: 'Bois', icon: <BoisIcon /> },
  { value: 'pac', label: 'Pompe à chaleur', icon: <PACIcon /> }
];

// Options pour les types de chaudières gaz
const chaudiereGazOptions: ChaudiereGazOption[] = [
  { value: 'standard', label: 'Chaudière standard' },
  { value: 'basse_temperature', label: 'Chaudière basse température' },
  { value: 'condensation', label: 'Chaudière à condensation' }
];

// Options pour les types de chauffage au bois
const chauffageBoisOptions: ChauffageBoisOption[] = [
  { value: 'insert', label: 'Insert' },
  { value: 'poele_buches', label: 'Poêle à bûches' },
  { value: 'poele_granules', label: 'Poêle à granulés' },
  { value: 'chaudiere', label: 'Chaudière bois' }
];

// Options pour les types de PAC
const pacOptions: PACOption[] = [
  { value: 'air_air', label: 'Air-air' },
  { value: 'air_eau', label: 'Air-eau' },
  { value: 'eau_eau', label: 'Eau-eau' },
  { value: 'geothermique', label: 'Géothermique' }
];

const Etape5_Chauffage: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
  const [energiePrincipale, setEnergiePrincipale] = useState<EnergieChauffage>(data?.energiePrincipale || null);
  const [typeChaudiereGaz, setTypeChaudiereGaz] = useState<TypeChaudiereGaz>(data?.typeChaudiereGaz || null);
  const [typeChauffageBois, setTypeChauffageBois] = useState<TypeChauffageBois>(data?.typeChauffageBois || null);
  const [typePAC, setTypePAC] = useState<TypePAC>(data?.typePAC || null);
  const [chauffageSecondaire, setChauffageSecondaire] = useState<boolean>(data?.chauffageSecondaire || false);
  const [energieSecondaire, setEnergieSecondaire] = useState<EnergieChauffage>(data?.energieSecondaire || null);
  const [showSecondaryOptions, setShowSecondaryOptions] = useState<boolean>(false);
  
  // Obtenir les options additionnelles en fonction de l'énergie principale
  const getAdditionalOptions = () => {
    if (energiePrincipale === 'gaz') {
      return (
        <>
          <h3>Type de chaudière gaz</h3>
          <div className="options-grid options-grid-secondary">
            {chaudiereGazOptions.map(option => (
              <div 
                key={option.value} 
                className={`option-button ${typeChaudiereGaz === option.value ? 'selected' : ''}`}
                onClick={() => handleSecondaryOptionSelect('gaz', option.value)}
              >
                <span className="option-label">{option.label}</span>
              </div>
            ))}
          </div>
        </>
      );
    } else if (energiePrincipale === 'bois') {
      return (
        <>
          <h3>Type de chauffage au bois</h3>
          <div className="options-grid options-grid-secondary">
            {chauffageBoisOptions.map(option => (
              <div 
                key={option.value} 
                className={`option-button ${typeChauffageBois === option.value ? 'selected' : ''}`}
                onClick={() => handleSecondaryOptionSelect('bois', option.value)}
              >
                <span className="option-label">{option.label}</span>
              </div>
            ))}
          </div>
        </>
      );
    } else if (energiePrincipale === 'pac') {
      return (
        <>
          <h3>Type de pompe à chaleur</h3>
          <div className="options-grid options-grid-secondary">
            {pacOptions.map(option => (
              <div 
                key={option.value} 
                className={`option-button ${typePAC === option.value ? 'selected' : ''}`}
                onClick={() => handleSecondaryOptionSelect('pac', option.value)}
              >
                <span className="option-label">{option.label}</span>
              </div>
            ))}
          </div>
        </>
      );
    }
    return null;
  };
  
  // Gérer la sélection d'énergie principale
  const handleEnergiePrincipaleSelect = (value: EnergieChauffage) => {
    // Réinitialiser les options secondaires si l'énergie principale change
    if (value !== energiePrincipale) {
      setTypeChaudiereGaz(null);
      setTypeChauffageBois(null);
      setTypePAC(null);
    }
    
    setEnergiePrincipale(value);
    
    // Si l'énergie ne nécessite pas d'options supplémentaires
    if (value !== 'gaz' && value !== 'bois' && value !== 'pac') {
      setShowSecondaryOptions(true);
    }
  };
  
  // Gérer la sélection d'options secondaires
  const handleSecondaryOptionSelect = (type: string, value: any) => {
    if (type === 'gaz') {
      setTypeChaudiereGaz(value);
      setShowSecondaryOptions(true);
    } else if (type === 'bois') {
      setTypeChauffageBois(value);
      setShowSecondaryOptions(true);
    } else if (type === 'pac') {
      setTypePAC(value);
      setShowSecondaryOptions(true);
    }
  };
  
  // Gérer la réponse au chauffage secondaire
  const handleChauffageSecondaireSelect = (hasSecondary: boolean) => {
    setChauffageSecondaire(hasSecondary);
    if (!hasSecondary) {
      setEnergieSecondaire(null);
      submitData();
    }
  };
  
  // Gérer la sélection de l'énergie secondaire
  const handleEnergieSecondaireSelect = (value: EnergieChauffage) => {
    setEnergieSecondaire(value);
    submitData();
  };
  
  // Réinitialiser l'énergie principale
  const resetEnergiePrincipale = () => {
    setEnergiePrincipale(null);
    setTypeChaudiereGaz(null);
    setTypeChauffageBois(null);
    setTypePAC(null);
    setChauffageSecondaire(false);
    setEnergieSecondaire(null);
    setShowSecondaryOptions(false);
  };
  
  // Réinitialiser l'énergie secondaire
  const resetEnergieSecondaire = () => {
    setEnergieSecondaire(null);
  };
  
  // Soumettre toutes les données
  const submitData = () => {
    const formData: any = {
      energiePrincipale,
      chauffageSecondaire
    };
    
    // Ajouter les détails spécifiques selon l'énergie principale
    if (energiePrincipale === 'gaz' && typeChaudiereGaz) {
      formData.typeChaudiereGaz = typeChaudiereGaz;
    } else if (energiePrincipale === 'bois' && typeChauffageBois) {
      formData.typeChauffageBois = typeChauffageBois;
    } else if (energiePrincipale === 'pac' && typePAC) {
      formData.typePAC = typePAC;
    }
    
    // Ajouter l'énergie secondaire si nécessaire
    if (chauffageSecondaire && energieSecondaire) {
      formData.energieSecondaire = energieSecondaire;
    }
    
    onComplete(formData);
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitData();
  };
  
  // Vérifier si le formulaire est complet
  const isFormComplete = () => {
    // Vérifier si l'énergie principale est sélectionnée
    if (!energiePrincipale) return false;
    
    // Vérifier si les détails spécifiques sont fournis
    if (energiePrincipale === 'gaz' && !typeChaudiereGaz) return false;
    if (energiePrincipale === 'bois' && !typeChauffageBois) return false;
    if (energiePrincipale === 'pac' && !typePAC) return false;
    
    // Vérifier si les informations sur le chauffage secondaire sont complètes
    if (chauffageSecondaire && !energieSecondaire) return false;
    
    return true;
  };
  
  return (
    <div className="etape-container">
      <form onSubmit={handleSubmit}>
        <div className="question-block">
          <h2>Quelle est l'énergie de chauffage principale ?</h2>
          
          {!energiePrincipale ? (
            <div className="options-grid options-chauffage">
              {energieOptions.map(option => (
                <div 
                  key={option.value}
                  className="option-button"
                  onClick={() => handleEnergiePrincipaleSelect(option.value)}
                >
                  <div className="option-icon">
                    {option.icon}
                  </div>
                  <span className="option-label">{option.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="selected-option-container">
              <div className="selected-option-icon">
                {energieOptions.find(opt => opt.value === energiePrincipale)?.icon}
              </div>
              <div className="selected-option-content">
                <div className="selected-option-label">
                  {energieOptions.find(opt => opt.value === energiePrincipale)?.label}
                </div>
              </div>
              <div className="selected-option-action">
                <button 
                  type="button" 
                  className="reset-selected-button"
                  onClick={resetEnergiePrincipale}
                >
                  <RefreshIcon />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Options additionnelles basées sur l'énergie principale */}
        {energiePrincipale && (energiePrincipale === 'gaz' || energiePrincipale === 'bois' || energiePrincipale === 'pac') && 
          !((energiePrincipale === 'gaz' && typeChaudiereGaz) || 
            (energiePrincipale === 'bois' && typeChauffageBois) || 
            (energiePrincipale === 'pac' && typePAC)) && (
          <div className="question-block">
            {getAdditionalOptions()}
          </div>
        )}
        
        {/* Question pour le chauffage secondaire */}
        {showSecondaryOptions && (
          <div className="question-block">
            <h2>Avez-vous un système de chauffage secondaire ?</h2>
            
            {chauffageSecondaire === false ? (
              <div className="options-grid options-grid-binary">
                <div 
                  className="option-button"
                  onClick={() => handleChauffageSecondaireSelect(true)}
                >
                  <span className="option-label">Oui</span>
                </div>
                <div 
                  className="option-button selected"
                  onClick={() => handleChauffageSecondaireSelect(false)}
                >
                  <span className="option-label">Non</span>
                </div>
              </div>
            ) : chauffageSecondaire === true && !energieSecondaire ? (
              <>
                <div className="options-grid options-grid-binary">
                  <div 
                    className="option-button selected"
                    onClick={() => handleChauffageSecondaireSelect(true)}
                  >
                    <span className="option-label">Oui</span>
                  </div>
                  <div 
                    className="option-button"
                    onClick={() => handleChauffageSecondaireSelect(false)}
                  >
                    <span className="option-label">Non</span>
                  </div>
                </div>
                
                <h3>Quelle est l'énergie de chauffage secondaire ?</h3>
                <div className="options-grid options-chauffage">
                  {energieOptions
                    .filter(option => option.value !== energiePrincipale)
                    .map(option => (
                      <div 
                        key={option.value}
                        className="option-button"
                        onClick={() => handleEnergieSecondaireSelect(option.value)}
                      >
                        <div className="option-icon">
                          {option.icon}
                        </div>
                        <span className="option-label">{option.label}</span>
                      </div>
                    ))}
                </div>
              </>
            ) : chauffageSecondaire === true && energieSecondaire && (
              <>
                <div className="options-grid options-grid-binary">
                  <div 
                    className="option-button selected"
                    onClick={() => handleChauffageSecondaireSelect(true)}
                  >
                    <span className="option-label">Oui</span>
                  </div>
                  <div 
                    className="option-button"
                    onClick={() => handleChauffageSecondaireSelect(false)}
                  >
                    <span className="option-label">Non</span>
                  </div>
                </div>
                
                <h3>Énergie de chauffage secondaire</h3>
                <div className="selected-option-container">
                  <div className="selected-option-icon">
                    {energieOptions.find(opt => opt.value === energieSecondaire)?.icon}
                  </div>
                  <div className="selected-option-content">
                    <div className="selected-option-label">
                      {energieOptions.find(opt => opt.value === energieSecondaire)?.label}
                    </div>
                  </div>
                  <div className="selected-option-action">
                    <button 
                      type="button" 
                      className="reset-selected-button"
                      onClick={resetEnergieSecondaire}
                    >
                      <RefreshIcon />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Bouton pour soumettre */}
        <div className="step-buttons">
          <button 
            type="submit" 
            className="next-button"
            disabled={!isFormComplete()}
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Etape5_Chauffage; 