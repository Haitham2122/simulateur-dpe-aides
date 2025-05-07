import React, { useState, FormEvent, ChangeEvent } from 'react';
import { EtapeProps, FormeBien, Mitoyennete, Etages, TypeBien } from '../types/types';
import './Etape3_FormeEtMitoyennete.css';
import RefreshIcon from './icons/RefreshIcon';

// Icônes pour les formes de maisons
const CarreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const AllongeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H14V10H20V20H4V4Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const AutreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L20 12L16 20H8L4 12L12 4Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Icônes pour la mitoyenneté
const NonMitoyenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="12" height="12" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const UnCoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20V18H4V6Z" stroke="currentColor" strokeWidth="2" />
    <path d="M4 6V18" stroke="currentColor" strokeWidth="4" />
  </svg>
);

const DeuxCotesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20V18H4V6Z" stroke="currentColor" strokeWidth="2" />
    <path d="M4 6V18" stroke="currentColor" strokeWidth="4" />
    <path d="M20 6V18" stroke="currentColor" strokeWidth="4" />
  </svg>
);

// Icônes pour les étages
const PlainPiedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="10" width="16" height="8" stroke="currentColor" strokeWidth="2" />
    <path d="M8 10V18" stroke="currentColor" strokeWidth="2" />
    <path d="M16 10V18" stroke="currentColor" strokeWidth="2" />
    <path d="M4 8L12 4L20 8" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const UnEtageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="10" width="16" height="8" stroke="currentColor" strokeWidth="2" />
    <rect x="6" y="4" width="12" height="6" stroke="currentColor" strokeWidth="2" />
    <path d="M8 10V18" stroke="currentColor" strokeWidth="2" />
    <path d="M16 10V18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const PlusEtagesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="14" width="16" height="6" stroke="currentColor" strokeWidth="2" />
    <rect x="6" y="8" width="12" height="6" stroke="currentColor" strokeWidth="2" />
    <rect x="8" y="2" width="8" height="6" stroke="currentColor" strokeWidth="2" />
    <path d="M8 14V20" stroke="currentColor" strokeWidth="2" />
    <path d="M16 14V20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Icônes pour les emplacements d'appartement
const RezDeChausseeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="16" height="8" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12V20" stroke="currentColor" strokeWidth="2" />
    <path d="M16 12V20" stroke="currentColor" strokeWidth="2" />
    <line x1="4" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const IntermediaireIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="16" height="8" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V16" stroke="currentColor" strokeWidth="2" />
    <path d="M16 8V16" stroke="currentColor" strokeWidth="2" />
    <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" />
    <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const DernierEtageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="16" height="8" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12V20" stroke="currentColor" strokeWidth="2" />
    <path d="M16 12V20" stroke="currentColor" strokeWidth="2" />
    <path d="M4 11L12 4L20 11" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Icônes pour les types d'appartement
const SimpleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="12" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const DuplexIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="12" stroke="currentColor" strokeWidth="2" />
    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const TriplexIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="12" stroke="currentColor" strokeWidth="2" />
    <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="2" />
    <line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="2" />
  </svg>
);

interface OptionProps {
  selected: boolean;
  value: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

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

// Types pour les appartements
type EmplacementAppartement = 'rez_de_chaussee' | 'intermediaire' | 'dernier_etage' | null;
type TypeAppartement = 'simple' | 'duplex' | 'triplex' | null;

const Etape3_FormeEtMitoyennete: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
  // État pour maison
  const [formeBien, setFormeBien] = useState<FormeBien>(data?.formeBien || null);
  const [mitoyennete, setMitoyennete] = useState<Mitoyennete>(data?.mitoyennete || null);
  const [etages, setEtages] = useState<Etages>(data?.etages || null);
  
  // État pour appartement
  const [emplacementAppartement, setEmplacementAppartement] = useState<EmplacementAppartement>(
    data?.emplacementAppartement || null
  );
  const [typeAppartement, setTypeAppartement] = useState<TypeAppartement>(
    data?.typeAppartement || null
  );
  const [nombreFacades, setNombreFacades] = useState<number>(
    data?.nombreFacades || 2
  );
  
  // État commun
  const [surface, setSurface] = useState<string>(data?.surface || '');
  const [surfaceError, setSurfaceError] = useState<string>('');
  const [showSurface, setShowSurface] = useState<boolean>(
    (data?.typeBien === 'maison' && !!formeBien && !!mitoyennete && !!etages) ||
    (data?.typeBien === 'appartement' && !!emplacementAppartement && !!typeAppartement)
  );

  // Récupérer le type de bien
  const typeBien: TypeBien = data?.typeBien || null;

  // Get icon based on type and value
  const getIcon = (type: 'forme' | 'mitoyennete' | 'etages', value: string) => {
    if (type === 'forme') {
      if (value === 'carree') return <CarreIcon />;
      if (value === 'allongee') return <AllongeeIcon />;
      return <AutreIcon />;
    } else if (type === 'mitoyennete') {
      if (value === 'non') return <NonMitoyenIcon />;
      if (value === 'un_cote') return <UnCoteIcon />;
      return <DeuxCotesIcon />;
    } else {
      if (value === 'plain_pied') return <PlainPiedIcon />;
      if (value === 'un_etage') return <UnEtageIcon />;
      return <PlusEtagesIcon />;
    }
  };

  // Get label based on type and value
  const getLabel = (type: 'forme' | 'mitoyennete' | 'etages', value: string) => {
    if (type === 'forme') {
      if (value === 'carree') return 'Carrée ou rectangulaire';
      if (value === 'allongee') return 'Allongée ou en L';
      return 'Autre';
    } else if (type === 'mitoyennete') {
      if (value === 'non') return 'Non mitoyenne';
      if (value === 'un_cote') return 'Mitoyenne sur 1 côté';
      return 'Mitoyenne sur 2 côtés';
    } else {
      if (value === 'plain_pied') return 'Plain-pied';
      if (value === 'un_etage') return '1 étage';
      return '2 étages ou plus';
    }
  };

  // FONCTIONS POUR MAISON
  // Handle form selection
  const handleFormeChange = (value: FormeBien) => {
    setFormeBien(value);
    updateSubmitAvailabilityMaison(value, mitoyennete, etages);
  };

  // Reset forme selection
  const handleResetForme = () => {
    setFormeBien(null);
    setMitoyennete(null);
    setEtages(null);
    setShowSurface(false);
  };

  // Handle mitoyenneté selection
  const handleMitoyenneteChange = (value: Mitoyennete) => {
    setMitoyennete(value);
    updateSubmitAvailabilityMaison(formeBien, value, etages);
  };

  // Reset mitoyenneté selection
  const handleResetMitoyennete = () => {
    setMitoyennete(null);
    setEtages(null);
    setShowSurface(false);
  };

  // Handle etages selection
  const handleEtagesChange = (value: Etages) => {
    setEtages(value);
    updateSubmitAvailabilityMaison(formeBien, mitoyennete, value);
  };

  // Reset etages selection
  const handleResetEtages = () => {
    setEtages(null);
    setShowSurface(false);
  };

  // Update if we should show the surface field for maison
  const updateSubmitAvailabilityMaison = (
    forme: FormeBien, 
    mitoyen: Mitoyennete, 
    etg: Etages
  ) => {
    if (forme && mitoyen && etg) {
      setShowSurface(true);
    }
  };

  // FONCTIONS POUR APPARTEMENT
  // Handle emplacement appartement
  const handleEmplacementChange = (value: EmplacementAppartement) => {
    setEmplacementAppartement(value);
    updateSubmitAvailabilityAppartement(value, typeAppartement);
  };

  // Reset emplacement selection
  const handleResetEmplacement = () => {
    setEmplacementAppartement(null);
    setShowSurface(false);
  };

  // Handle type appartement
  const handleTypeAppartementChange = (value: TypeAppartement) => {
    setTypeAppartement(value);
    updateSubmitAvailabilityAppartement(emplacementAppartement, value);
  };

  // Reset type appartement
  const handleResetTypeAppartement = () => {
    setTypeAppartement(null);
    setShowSurface(false);
  };

  // Update if we should show the surface field for appartement
  const updateSubmitAvailabilityAppartement = (
    emplacement: EmplacementAppartement,
    type: TypeAppartement
  ) => {
    if (emplacement && type) {
      setShowSurface(true);
    }
  };

  // Handle nombre de façades change
  const handleIncrementFacades = () => {
    if (nombreFacades < 4) {
      setNombreFacades(nombreFacades + 1);
    }
  };

  const handleDecrementFacades = () => {
    if (nombreFacades > 1) {
      setNombreFacades(nombreFacades - 1);
    }
  };

  // Handle surface change
  const handleSurfaceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSurface(value);
    
    if (surfaceError) setSurfaceError('');
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!surface.trim()) {
      setSurfaceError('Veuillez indiquer la surface');
      return;
    }
    
    const surfaceValue = parseFloat(surface.replace(',', '.'));
    
    if (isNaN(surfaceValue) || surfaceValue <= 0) {
      setSurfaceError('Veuillez saisir une surface valide');
      return;
    }

    if (typeBien === 'maison') {
      onComplete({
        formeBien,
        mitoyennete,
        etages,
        surface
      });
    } else if (typeBien === 'appartement') {
      onComplete({
        emplacementAppartement,
        typeAppartement,
        nombreFacades,
        surface
      });
    }
  };

  return (
    <div className="etape-container">
      <form onSubmit={handleSubmit}>
        {/* Afficher les questions spécifiques selon le type de bien */}
        {typeBien === 'maison' ? (
          // Questions pour les maisons
          <>
            {/* Question sur la forme */}
            <div className="question-block">
              <h2>Quelle est la forme de votre maison ?</h2>
              
              {!formeBien ? (
                <div className="options-grid">
                  <Option 
                    selected={formeBien === 'carree'}
                    value="carree"
                    label="Carrée ou rectangulaire"
                    icon={<CarreIcon />}
                    onClick={() => handleFormeChange('carree')}
                  />
                  <Option 
                    selected={formeBien === 'allongee'}
                    value="allongee"
                    label="Allongée ou en L"
                    icon={<AllongeeIcon />}
                    onClick={() => handleFormeChange('allongee')}
                  />
                  <Option 
                    selected={formeBien === 'autre'}
                    value="autre"
                    label="Autre"
                    icon={<AutreIcon />}
                    onClick={() => handleFormeChange('autre')}
                  />
                </div>
              ) : (
                <div className="selected-option-container">
                  <div className="selected-option-icon">
                    {getIcon('forme', formeBien)}
                  </div>
                  <div className="selected-option-content">
                    <div className="selected-option-label">
                      {getLabel('forme', formeBien)}
                    </div>
                  </div>
                  <div className="selected-option-action">
                    <button
                      type="button"
                      className="reset-selected-button"
                      onClick={handleResetForme}
                      aria-label="Modifier la sélection"
                    >
                      <RefreshIcon />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Question sur la mitoyenneté */}
            {formeBien && (
              <div className="question-block">
                <h2>Votre maison est-elle mitoyenne ?</h2>
                
                {!mitoyennete ? (
                  <div className="options-grid">
                    <Option 
                      selected={mitoyennete === 'non'}
                      value="non"
                      label="Non mitoyenne"
                      icon={<NonMitoyenIcon />}
                      onClick={() => handleMitoyenneteChange('non')}
                    />
                    <Option 
                      selected={mitoyennete === 'un_cote'}
                      value="un_cote"
                      label="Mitoyenne sur 1 côté"
                      icon={<UnCoteIcon />}
                      onClick={() => handleMitoyenneteChange('un_cote')}
                    />
                    <Option 
                      selected={mitoyennete === 'deux_cotes'}
                      value="deux_cotes"
                      label="Mitoyenne sur 2 côtés"
                      icon={<DeuxCotesIcon />}
                      onClick={() => handleMitoyenneteChange('deux_cotes')}
                    />
                  </div>
                ) : (
                  <div className="selected-option-container">
                    <div className="selected-option-icon">
                      {getIcon('mitoyennete', mitoyennete)}
                    </div>
                    <div className="selected-option-content">
                      <div className="selected-option-label">
                        {getLabel('mitoyennete', mitoyennete)}
                      </div>
                    </div>
                    <div className="selected-option-action">
                      <button
                        type="button"
                        className="reset-selected-button"
                        onClick={handleResetMitoyennete}
                        aria-label="Modifier la sélection"
                      >
                        <RefreshIcon />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Question sur les étages */}
            {formeBien && mitoyennete && (
              <div className="question-block">
                <h2>Combien d'étages possède votre maison ?</h2>
                
                {!etages ? (
                  <div className="options-grid">
                    <Option 
                      selected={etages === 'plain_pied'}
                      value="plain_pied"
                      label="Plain-pied"
                      icon={<PlainPiedIcon />}
                      onClick={() => handleEtagesChange('plain_pied')}
                    />
                    <Option 
                      selected={etages === 'un_etage'}
                      value="un_etage"
                      label="1 étage"
                      icon={<UnEtageIcon />}
                      onClick={() => handleEtagesChange('un_etage')}
                    />
                    <Option 
                      selected={etages === 'plus_etages'}
                      value="plus_etages"
                      label="2 étages ou plus"
                      icon={<PlusEtagesIcon />}
                      onClick={() => handleEtagesChange('plus_etages')}
                    />
                  </div>
                ) : (
                  <div className="selected-option-container">
                    <div className="selected-option-icon">
                      {getIcon('etages', etages)}
                    </div>
                    <div className="selected-option-content">
                      <div className="selected-option-label">
                        {getLabel('etages', etages)}
                      </div>
                    </div>
                    <div className="selected-option-action">
                      <button
                        type="button"
                        className="reset-selected-button"
                        onClick={handleResetEtages}
                        aria-label="Modifier la sélection"
                      >
                        <RefreshIcon />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          // Questions pour les appartements
          <>
            {/* Emplacement de l'appartement */}
            <div className="question-block">
              <h2>Emplacement de l'appartement</h2>
              
              {!emplacementAppartement ? (
                <div className="options-grid">
                  <Option 
                    selected={emplacementAppartement === 'rez_de_chaussee'}
                    value="rez_de_chaussee"
                    label="Rez-de-chaussée"
                    icon={<RezDeChausseeIcon />}
                    onClick={() => handleEmplacementChange('rez_de_chaussee')}
                  />
                  <Option 
                    selected={emplacementAppartement === 'intermediaire'}
                    value="intermediaire"
                    label="Intermédiaire"
                    icon={<IntermediaireIcon />}
                    onClick={() => handleEmplacementChange('intermediaire')}
                  />
                  <Option 
                    selected={emplacementAppartement === 'dernier_etage'}
                    value="dernier_etage"
                    label="Dernier étage"
                    icon={<DernierEtageIcon />}
                    onClick={() => handleEmplacementChange('dernier_etage')}
                  />
                </div>
              ) : (
                <div className="selected-option-container">
                  <div className="selected-option-icon">
                    {emplacementAppartement === 'rez_de_chaussee' ? <RezDeChausseeIcon /> :
                     emplacementAppartement === 'intermediaire' ? <IntermediaireIcon /> :
                     <DernierEtageIcon />}
                  </div>
                  <div className="selected-option-content">
                    <div className="selected-option-label">
                      {emplacementAppartement === 'rez_de_chaussee' ? 'Rez-de-chaussée' :
                       emplacementAppartement === 'intermediaire' ? 'Intermédiaire' :
                       'Dernier étage'}
                    </div>
                  </div>
                  <div className="selected-option-action">
                    <button
                      type="button"
                      className="reset-selected-button"
                      onClick={handleResetEmplacement}
                      aria-label="Modifier la sélection"
                    >
                      <RefreshIcon />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Type d'appartement */}
            <div className="question-block">
              <h2>Type d'appartement</h2>
              
              {!typeAppartement ? (
                <div className="options-grid">
                  <Option 
                    selected={typeAppartement === 'simple'}
                    value="simple"
                    label="Simple"
                    icon={<SimpleIcon />}
                    onClick={() => handleTypeAppartementChange('simple')}
                  />
                  <Option 
                    selected={typeAppartement === 'duplex'}
                    value="duplex"
                    label="Duplex"
                    icon={<DuplexIcon />}
                    onClick={() => handleTypeAppartementChange('duplex')}
                  />
                  <Option 
                    selected={typeAppartement === 'triplex'}
                    value="triplex"
                    label="Triplex"
                    icon={<TriplexIcon />}
                    onClick={() => handleTypeAppartementChange('triplex')}
                  />
                </div>
              ) : (
                <div className="selected-option-container">
                  <div className="selected-option-icon">
                    {typeAppartement === 'simple' ? <SimpleIcon /> :
                     typeAppartement === 'duplex' ? <DuplexIcon /> :
                     <TriplexIcon />}
                  </div>
                  <div className="selected-option-content">
                    <div className="selected-option-label">
                      {typeAppartement === 'simple' ? 'Simple' :
                       typeAppartement === 'duplex' ? 'Duplex' :
                       'Triplex'}
                    </div>
                  </div>
                  <div className="selected-option-action">
                    <button
                      type="button"
                      className="reset-selected-button"
                      onClick={handleResetTypeAppartement}
                      aria-label="Modifier la sélection"
                    >
                      <RefreshIcon />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Nombre de façades */}
            <div className="question-block">
              <h2>Nombre de façades donnant sur l'extérieur</h2>
              
              <div className="counter-input">
                <button 
                  type="button" 
                  className="counter-button"
                  onClick={handleDecrementFacades}
                  disabled={nombreFacades <= 1}
                >
                  -
                </button>
                <span className="counter-value">{nombreFacades}</span>
                <button 
                  type="button" 
                  className="counter-button"
                  onClick={handleIncrementFacades}
                  disabled={nombreFacades >= 4}
                >
                  +
                </button>
              </div>
            </div>
          </>
        )}
        
        {/* Surface habitable - commun aux deux types */}
        {showSurface && (
          <div className="question-block">
            <h2>Quelle est la surface habitable de votre {typeBien === 'maison' ? 'maison' : 'appartement'} ?</h2>
            
            <div className="surface-input-container">
              <input
                type="text"
                className={`surface-input ${surfaceError ? 'error' : ''}`}
                value={surface}
                onChange={handleSurfaceChange}
                placeholder="Surface en m²"
                inputMode="decimal"
              />
              <span className="surface-unit">m²</span>
            </div>
            
            {surfaceError && (
              <p className="error-message">{surfaceError}</p>
            )}
          </div>
        )}
        
        <div className="step-buttons">
          <button
            type="submit"
            className="next-button"
            disabled={
              (typeBien === 'maison' && (!formeBien || !mitoyennete || !etages || !surface)) ||
              (typeBien === 'appartement' && (!emplacementAppartement || !typeAppartement || !surface))
            }
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Etape3_FormeEtMitoyennete; 