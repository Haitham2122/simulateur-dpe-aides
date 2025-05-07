import React, { useState, useEffect } from 'react';
import { EtapeProps, EtatIsolation, TypeVitrage } from '../types/types';
import RefreshIcon from './icons/RefreshIcon';
import './Etape4_Isolation.css';

interface IsolationOption {
  value: EtatIsolation;
  label: string;
}

interface VitrageOption {
  value: TypeVitrage;
  label: string;
}

const isolationOptions: IsolationOption[] = [
  { value: 'oui', label: 'Oui' },
  { value: 'non', label: 'Non' },
  { value: 'je_ne_sais_pas', label: 'Je ne sais pas' }
];

const isolationDateOptions: IsolationOption[] = [
  { value: 'oui', label: '- de 10 ans' },
  { value: 'non', label: '+ de 10 ans' },
  { value: 'je_ne_sais_pas', label: 'Aucun travaux' }
];

const vitrageOptions: VitrageOption[] = [
  { value: 'simple', label: 'Simple vitrage' },
  { value: 'double', label: 'Double vitrage' },
  { value: 'triple', label: 'Triple vitrage' }
];

// Icône pour les différents types d'isolation
const IsolationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Icône pour le vitrage
const VitrageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Icônes pour les types de toiture
const ComblesPerdusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9L12 2L22 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 8V20H20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ComblesAmenagesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9L12 2L22 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 8V20H20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="8" y1="14" x2="8" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="16" y1="14" x2="16" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ToitTerrasseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="20" height="12" stroke="currentColor" strokeWidth="2"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Types de sous-sol
const TerrePleinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="12" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 18C3 18 6 16 12 16C18 16 21 18 21 18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const VideSanitaireIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="12" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="2"/>
    <line x1="7" y1="14" x2="7" y2="18" stroke="currentColor" strokeWidth="2"/>
    <line x1="17" y1="14" x2="17" y2="18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const SousSolIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="2"/>
    <line x1="7" y1="14" x2="7" y2="21" stroke="currentColor" strokeWidth="2"/>
    <line x1="17" y1="14" x2="17" y2="21" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Types de toiture
type TypeToiture = 'combles_perdus' | 'combles_amenages' | 'toit_terrasse' | null;
// Types de sous-sol
type TypeSousSol = 'terre_plein' | 'vide_sanitaire' | 'sous_sol_non_chauffe' | null;

const Etape4_Isolation: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
  // États communs à tous les types de bien
  const [isolationMurs, setIsolationMurs] = useState<EtatIsolation>(data?.isolationMurs || null);
  const [typeVitrage, setTypeVitrage] = useState<TypeVitrage>(data?.typeVitrage || null);
  const [nombreFenetres, setNombreFenetres] = useState<number>(data?.nombreFenetres || 2);
  
  // États spécifiques aux maisons
  const [isolationCombles, setIsolationCombles] = useState<EtatIsolation>(data?.isolationCombles || null);
  const [isolationSol, setIsolationSol] = useState<EtatIsolation>(data?.isolationSol || null);
  
  // États spécifiques aux appartements
  const [typeToiture, setTypeToiture] = useState<TypeToiture>(data?.typeToiture || null);
  const [isolationToiture, setIsolationToiture] = useState<EtatIsolation>(data?.isolationToiture || null);
  const [typeSousSol, setTypeSousSol] = useState<TypeSousSol>(data?.typeSousSol || null);
  const [isolationSousSol, setIsolationSousSol] = useState<EtatIsolation>(data?.isolationSousSol || null);
  
  // État pour gérer l'affichage progressif des questions
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false);
  
  // Récupérer le type de bien et l'emplacement
  const typeBien = data?.typeBien || 'maison';
  const emplacementAppartement = data?.emplacementAppartement || null;
  
  // Déterminer si on affiche toutes les questions en bloc ou progressivement
  useEffect(() => {
    // Si la surface est > 50m², afficher toutes les questions
    if (data?.surface && parseFloat(data.surface) > 50) {
      setShowAllQuestions(true);
    }
  }, [data?.surface]);
  
  // Vérifier si toutes les questions nécessaires ont été répondues
  const checkAllQuestionsAnswered = () => {
    if (typeBien === 'maison') {
      return !!isolationCombles && !!isolationSol && !!isolationMurs && !!typeVitrage;
    } else if (typeBien === 'appartement') {
      // Pour un appartement en dernier étage
      if (emplacementAppartement === 'dernier_etage') {
        return !!typeToiture && !!isolationToiture && !!isolationMurs && !!typeVitrage;
      } 
      // Pour un appartement en rez-de-chaussée
      else if (emplacementAppartement === 'rez_de_chaussee') {
        return !!typeSousSol && !!isolationSousSol && !!isolationMurs && !!typeVitrage;
      }
      // Pour un appartement intermédiaire
      else {
        return !!isolationMurs && !!typeVitrage;
      }
    }
    return false;
  };
  
  // Gérer la sélection pour l'isolation des murs
  const handleMursChange = (value: EtatIsolation) => {
    setIsolationMurs(value);
    if (!showAllQuestions) {
      if (typeBien === 'maison') {
        setCurrentQuestion(3);
      } else {
        setCurrentQuestion(2);
      }
    } else if (checkAllQuestionsAnswered()) {
      submitAllData();
    }
  };
  
  // Gérer la sélection pour l'isolation des combles (maison)
  const handleComblesChange = (value: EtatIsolation) => {
    setIsolationCombles(value);
    if (!showAllQuestions) {
      setCurrentQuestion(2);
    } else if (checkAllQuestionsAnswered()) {
      submitAllData();
    }
  };
  
  // Gérer la sélection pour l'isolation du sol (maison)
  const handleSolChange = (value: EtatIsolation) => {
    setIsolationSol(value);
    if (!showAllQuestions) {
      setCurrentQuestion(3);
    } else if (checkAllQuestionsAnswered()) {
      submitAllData();
    }
  };
  
  // Gérer la sélection du type de toiture (appartement dernier étage)
  const handleTypeToitureChange = (value: TypeToiture) => {
    setTypeToiture(value);
    if (!showAllQuestions) {
      setCurrentQuestion(2);
    }
  };
  
  // Gérer la sélection pour l'isolation de la toiture (appartement dernier étage)
  const handleIsolationToitureChange = (value: EtatIsolation) => {
    setIsolationToiture(value);
    if (!showAllQuestions) {
      setCurrentQuestion(3);
    } else if (checkAllQuestionsAnswered()) {
      submitAllData();
    }
  };
  
  // Gérer la sélection du type de sous-sol (appartement RDC)
  const handleTypeSousSolChange = (value: TypeSousSol) => {
    setTypeSousSol(value);
    if (!showAllQuestions) {
      setCurrentQuestion(2);
    }
  };
  
  // Gérer la sélection pour l'isolation du sous-sol (appartement RDC)
  const handleIsolationSousSolChange = (value: EtatIsolation) => {
    setIsolationSousSol(value);
    if (!showAllQuestions) {
      setCurrentQuestion(3);
    } else if (checkAllQuestionsAnswered()) {
      submitAllData();
    }
  };
  
  // Gérer la sélection pour le type de vitrage
  const handleVitrageChange = (value: TypeVitrage) => {
    setTypeVitrage(value);
    if (checkAllQuestionsAnswered()) {
      submitAllData();
    }
  };
  
  // Gérer le nombre de fenêtres
  const handleIncrementFenetres = () => {
    setNombreFenetres(nombreFenetres + 1);
  };
  
  const handleDecrementFenetres = () => {
    if (nombreFenetres > 1) {
      setNombreFenetres(nombreFenetres - 1);
    }
  };
  
  // Soumettre toutes les données
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAllData();
  };
  
  // Fonction pour soumettre les données
  const submitAllData = () => {
    if (typeBien === 'maison') {
      onComplete({
        isolationCombles,
        isolationSol,
        isolationMurs,
        typeVitrage,
        nombreFenetres
      });
    } else if (typeBien === 'appartement') {
      // Pour un appartement en dernier étage
      if (emplacementAppartement === 'dernier_etage') {
        onComplete({
          typeToiture,
          isolationToiture,
          isolationMurs,
          typeVitrage,
          nombreFenetres
        });
      } 
      // Pour un appartement en rez-de-chaussée
      else if (emplacementAppartement === 'rez_de_chaussee') {
        onComplete({
          typeSousSol,
          isolationSousSol,
          isolationMurs,
          typeVitrage,
          nombreFenetres
        });
      }
      // Pour un appartement intermédiaire
      else {
        onComplete({
          isolationMurs,
          typeVitrage,
          nombreFenetres
        });
      }
    }
  };
  
  // Réinitialiser une sélection
  const resetSelection = (field: string) => {
    switch (field) {
      case 'murs':
        setIsolationMurs(null);
        if (!showAllQuestions) {
          if (typeBien === 'maison') {
            setCurrentQuestion(2);
          } else {
            setCurrentQuestion(1);
          }
        }
        break;
      case 'combles':
        setIsolationCombles(null);
        if (!showAllQuestions) setCurrentQuestion(1);
        break;
      case 'sol':
        setIsolationSol(null);
        if (!showAllQuestions) setCurrentQuestion(2);
        break;
      case 'typeToiture':
        setTypeToiture(null);
        if (!showAllQuestions) setCurrentQuestion(1);
        break;
      case 'isolationToiture':
        setIsolationToiture(null);
        if (!showAllQuestions) setCurrentQuestion(2);
        break;
      case 'typeSousSol':
        setTypeSousSol(null);
        if (!showAllQuestions) setCurrentQuestion(1);
        break;
      case 'isolationSousSol':
        setIsolationSousSol(null);
        if (!showAllQuestions) setCurrentQuestion(2);
        break;
      case 'vitrage':
        setTypeVitrage(null);
        if (!showAllQuestions) {
          if (typeBien === 'maison') {
            setCurrentQuestion(4);
          } else {
            setCurrentQuestion(3);
          }
        }
        break;
    }
  };
  
  // Rendu de l'option sélectionnée
  const renderSelectedOption = (
    type: string,
    value: any,
    icon: React.ReactNode,
    label: string,
    resetHandler: () => void
  ) => {
    return (
      <div className="selected-option-container">
        <div className="selected-option-icon">
          {icon}
        </div>
        <div className="selected-option-content">
          <div className="selected-option-label">
            {label}
          </div>
        </div>
        <div className="selected-option-action">
          <button 
            type="button" 
            className="reset-selected-button"
            onClick={resetHandler}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="etape-container">
      <form onSubmit={handleSubmit}>
        <h2>Isolation du bâti</h2>
        
        {/* Questions pour une maison */}
        {typeBien === 'maison' && (
          <>
            {/* Isolation des combles */}
            {(showAllQuestions || currentQuestion === 1) && (
              <div className="question-block">
                <h3>Vos combles/toiture sont-ils isolés ?</h3>
                
                {!isolationCombles ? (
                  <div className="options-grid">
                    {isolationDateOptions.map(option => (
                      <div 
                        key={option.value} 
                        className="option-button"
                        onClick={() => handleComblesChange(option.value)}
                      >
                        <div className="option-icon">
                          <IsolationIcon />
                        </div>
                        <span className="option-label">{option.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  renderSelectedOption(
                    'combles',
                    isolationCombles,
                    <IsolationIcon />,
                    isolationDateOptions.find(opt => opt.value === isolationCombles)?.label || '',
                    () => resetSelection('combles')
                  )
                )}
              </div>
            )}
            
            {/* Isolation du sol */}
            {(showAllQuestions || currentQuestion >= 2) && (
              <div className="question-block">
                <h3>Votre sol est-il isolé ?</h3>
                
                {!isolationSol ? (
                  <div className="options-grid">
                    {isolationDateOptions.map(option => (
                      <div 
                        key={option.value} 
                        className="option-button"
                        onClick={() => handleSolChange(option.value)}
                      >
                        <div className="option-icon">
                          <IsolationIcon />
                        </div>
                        <span className="option-label">{option.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  renderSelectedOption(
                    'sol',
                    isolationSol,
                    <IsolationIcon />,
                    isolationDateOptions.find(opt => opt.value === isolationSol)?.label || '',
                    () => resetSelection('sol')
                  )
                )}
              </div>
            )}
          </>
        )}
        
        {/* Questions pour un appartement en dernier étage */}
        {typeBien === 'appartement' && emplacementAppartement === 'dernier_etage' && (
          <>
            {/* Type de toiture */}
            {(showAllQuestions || currentQuestion === 1) && (
              <div className="question-block">
                <h3>Type de toiture</h3>
                
                {!typeToiture ? (
                  <div className="options-grid">
                    <div 
                      className="option-button"
                      onClick={() => handleTypeToitureChange('combles_perdus')}
                    >
                      <div className="option-icon">
                        <ComblesPerdusIcon />
                      </div>
                      <span className="option-label">Combles perdus</span>
                    </div>
                    <div 
                      className="option-button"
                      onClick={() => handleTypeToitureChange('combles_amenages')}
                    >
                      <div className="option-icon">
                        <ComblesAmenagesIcon />
                      </div>
                      <span className="option-label">Combles aménagés</span>
                    </div>
                    <div 
                      className="option-button"
                      onClick={() => handleTypeToitureChange('toit_terrasse')}
                    >
                      <div className="option-icon">
                        <ToitTerrasseIcon />
                      </div>
                      <span className="option-label">Toit terrasse</span>
                    </div>
                  </div>
                ) : (
                  renderSelectedOption(
                    'typeToiture',
                    typeToiture,
                    typeToiture === 'combles_perdus' ? <ComblesPerdusIcon /> :
                    typeToiture === 'combles_amenages' ? <ComblesAmenagesIcon /> :
                    <ToitTerrasseIcon />,
                    typeToiture === 'combles_perdus' ? 'Combles perdus' :
                    typeToiture === 'combles_amenages' ? 'Combles aménagés' :
                    'Toit terrasse',
                    () => resetSelection('typeToiture')
                  )
                )}
              </div>
            )}
            
            {/* Isolation des combles/toiture */}
            {((showAllQuestions || currentQuestion >= 2) && typeToiture) && (
              <div className="question-block">
                <h3>Dernière isolation des combles</h3>
                
                {!isolationToiture ? (
                  <div className="options-grid">
                    {isolationDateOptions.map(option => (
                      <div 
                        key={option.value} 
                        className="option-button"
                        onClick={() => handleIsolationToitureChange(option.value)}
                      >
                        <div className="option-icon">
                          <IsolationIcon />
                        </div>
                        <span className="option-label">{option.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  renderSelectedOption(
                    'isolationToiture',
                    isolationToiture,
                    <IsolationIcon />,
                    isolationDateOptions.find(opt => opt.value === isolationToiture)?.label || '',
                    () => resetSelection('isolationToiture')
                  )
                )}
              </div>
            )}
          </>
        )}
        
        {/* Questions pour un appartement en rez-de-chaussée */}
        {typeBien === 'appartement' && emplacementAppartement === 'rez_de_chaussee' && (
          <>
            {/* Type de sous-sol */}
            {(showAllQuestions || currentQuestion === 1) && (
              <div className="question-block">
                <h3>Type de sous-sol</h3>
                
                {!typeSousSol ? (
                  <div className="options-grid">
                    <div 
                      className="option-button"
                      onClick={() => handleTypeSousSolChange('terre_plein')}
                    >
                      <div className="option-icon">
                        <TerrePleinIcon />
                      </div>
                      <span className="option-label">Terre-plein</span>
                    </div>
                    <div 
                      className="option-button"
                      onClick={() => handleTypeSousSolChange('vide_sanitaire')}
                    >
                      <div className="option-icon">
                        <VideSanitaireIcon />
                      </div>
                      <span className="option-label">Vide sanitaire</span>
                    </div>
                    <div 
                      className="option-button"
                      onClick={() => handleTypeSousSolChange('sous_sol_non_chauffe')}
                    >
                      <div className="option-icon">
                        <SousSolIcon />
                      </div>
                      <span className="option-label">Sous-sol non chauffé</span>
                    </div>
                  </div>
                ) : (
                  renderSelectedOption(
                    'typeSousSol',
                    typeSousSol,
                    typeSousSol === 'terre_plein' ? <TerrePleinIcon /> :
                    typeSousSol === 'vide_sanitaire' ? <VideSanitaireIcon /> :
                    <SousSolIcon />,
                    typeSousSol === 'terre_plein' ? 'Terre-plein' :
                    typeSousSol === 'vide_sanitaire' ? 'Vide sanitaire' :
                    'Sous-sol non chauffé',
                    () => resetSelection('typeSousSol')
                  )
                )}
              </div>
            )}
            
            {/* Date de la dernière isolation du sous-sol */}
            {((showAllQuestions || currentQuestion >= 2) && typeSousSol) && (
              <div className="question-block">
                <h3>Date de la dernière isolation du sous-sol</h3>
                
                {!isolationSousSol ? (
                  <div className="options-grid">
                    {isolationDateOptions.map(option => (
                      <div 
                        key={option.value} 
                        className="option-button"
                        onClick={() => handleIsolationSousSolChange(option.value)}
                      >
                        <div className="option-icon">
                          <IsolationIcon />
                        </div>
                        <span className="option-label">{option.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  renderSelectedOption(
                    'isolationSousSol',
                    isolationSousSol,
                    <IsolationIcon />,
                    isolationDateOptions.find(opt => opt.value === isolationSousSol)?.label || '',
                    () => resetSelection('isolationSousSol')
                  )
                )}
              </div>
            )}
          </>
        )}
        
        {/* Isolation des murs - commun à tous les types */}
        {(showAllQuestions || 
          (typeBien === 'maison' && currentQuestion >= 3) || 
          (typeBien === 'appartement' && 
           ((emplacementAppartement === 'dernier_etage' && currentQuestion >= 3) ||
            (emplacementAppartement === 'rez_de_chaussee' && currentQuestion >= 3) ||
            (emplacementAppartement === 'intermediaire' && currentQuestion >= 1))
          )) && (
          <div className="question-block">
            <h3>Dernière isolation des murs</h3>
            
            {!isolationMurs ? (
              <div className="options-grid">
                {isolationDateOptions.map(option => (
                  <div 
                    key={option.value} 
                    className="option-button"
                    onClick={() => handleMursChange(option.value)}
                  >
                    <div className="option-icon">
                      <IsolationIcon />
                    </div>
                    <span className="option-label">{option.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              renderSelectedOption(
                'murs',
                isolationMurs,
                <IsolationIcon />,
                isolationDateOptions.find(opt => opt.value === isolationMurs)?.label || '',
                () => resetSelection('murs')
              )
            )}
          </div>
        )}
        
        {/* Nombre de fenêtres - commun à tous les types */}
        {(showAllQuestions || 
          (typeBien === 'maison' && currentQuestion >= 3 && isolationMurs) || 
          (typeBien === 'appartement' && 
           ((emplacementAppartement === 'dernier_etage' && currentQuestion >= 3 && isolationMurs) ||
            (emplacementAppartement === 'rez_de_chaussee' && currentQuestion >= 3 && isolationMurs) ||
            (emplacementAppartement === 'intermediaire' && currentQuestion >= 1 && isolationMurs))
          )) && (
          <div className="question-block">
            <h3>Nombre de fenêtres</h3>
            
            <div className="counter-input">
              <button 
                type="button" 
                className="counter-button"
                onClick={handleDecrementFenetres}
                disabled={nombreFenetres <= 1}
              >
                -
              </button>
              <span className="counter-value">{nombreFenetres}</span>
              <button 
                type="button" 
                className="counter-button"
                onClick={handleIncrementFenetres}
              >
                +
              </button>
            </div>
          </div>
        )}
        
        {/* Type de vitrage - commun à tous les types */}
        {(showAllQuestions || 
          (typeBien === 'maison' && currentQuestion >= 4) || 
          (typeBien === 'appartement' && 
           ((emplacementAppartement === 'dernier_etage' && currentQuestion >= 3 && isolationMurs) ||
            (emplacementAppartement === 'rez_de_chaussee' && currentQuestion >= 3 && isolationMurs) ||
            (emplacementAppartement === 'intermediaire' && currentQuestion >= 1 && isolationMurs))
          )) && (
          <div className="question-block">
            <h3>Type de vitrage</h3>
            
            {!typeVitrage ? (
              <div className="options-grid">
                {vitrageOptions.map(option => (
                  <div 
                    key={option.value} 
                    className="option-button"
                    onClick={() => handleVitrageChange(option.value)}
                  >
                    <div className="option-icon">
                      <VitrageIcon />
                    </div>
                    <span className="option-label">{option.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              renderSelectedOption(
                'vitrage',
                typeVitrage,
                <VitrageIcon />,
                vitrageOptions.find(opt => opt.value === typeVitrage)?.label || '',
                () => resetSelection('vitrage')
              )
            )}
          </div>
        )}
        
        <div className="step-buttons">
          <button
            type="submit"
            className="next-button"
            disabled={!checkAllQuestionsAnswered()}
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Etape4_Isolation; 