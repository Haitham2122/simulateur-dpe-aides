import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { EtapeProps } from '../types/types';
import RefreshIcon from './icons/RefreshIcon';
import './Etape2_Localisation.css';

interface CommuneData {
  Commune: string;
  Codepos: string;
  Departement: string;
  INSEE: string;
}

const Etape2_Localisation: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
  const [codePostal, setCodePostal] = useState<string>(data?.codePostal || '');
  const [anneeConstruction, setAnneeConstruction] = useState<string>(data?.anneeConstruction || '');
  const [codePostalError, setCodePostalError] = useState<string>('');
  const [anneeError, setAnneeError] = useState<string>('');
  const [codePostalValid, setCodePostalValid] = useState<boolean>(!!data?.codePostal);
  const [communesData, setCommunesData] = useState<CommuneData[]>([]);
  const [suggestions, setSuggestions] = useState<CommuneData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
  // Current year for validation
  const currentYear = new Date().getFullYear();

  // Load communes data from CSV
  useEffect(() => {
    fetch('/assets/communes-france.csv')
      .then(response => response.text())
      .then(csvText => {
        const lines = csvText.split('\n');
        
        const parsedData: CommuneData[] = [];
        
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim() === '') continue;
          
          // Split by semicolon instead of comma
          const values = lines[i].split(';');
          if (values.length >= 4) {
            const commune: CommuneData = {
              Commune: values[0]?.trim() || '',
              Codepos: values[1]?.trim() || '',
              Departement: values[2]?.trim() || '',
              INSEE: values[3]?.trim() || ''
            };
            
            parsedData.push(commune);
          }
        }
        
        setCommunesData(parsedData);
      })
      .catch(error => console.error('Error loading communes data:', error));
  }, []);

  // Validate postal code
  const validateCodePostal = (code: string): boolean => {
    if (code.match(/^\d{5}$/)) {
      setCodePostalError('');
      return true;
    } else {
      setCodePostalError('Veuillez entrer un code postal valide (5 chiffres)');
      return false;
    }
  };

  // Validate year
  const validateAnnee = (annee: string): boolean => {
    if (!annee.match(/^\d{4}$/)) {
      setAnneeError('Veuillez entrer une année valide (4 chiffres)');
      return false;
    }
    
    const year = parseInt(annee, 10);
    if (year > currentYear) {
      setAnneeError('L\'année ne peut pas être dans le futur');
      return false;
    }
    
    if (year < 1800) {
      setAnneeError('L\'année semble trop ancienne, veuillez vérifier');
      return false;
    }
    
    setAnneeError('');
    return true;
  };

  // Handle postal code change
  const handleCodePostalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCodePostal(value);
    
    if (codePostalError) setCodePostalError('');
    
    // Filter suggestions when user types at least 2 digits
    if (value.length >= 2) {
      const filteredSuggestions = communesData.filter(
        commune => commune.Codepos.startsWith(value)
      );
      
      // Get unique postal codes only
      const uniquePostalCodes = Array.from(
        new Set(filteredSuggestions.map(item => item.Codepos))
      ).map(code => {
        return filteredSuggestions.find(item => item.Codepos === code);
      }).filter(Boolean) as CommuneData[];
      
      setSuggestions(uniquePostalCodes.slice(0, 10)); // Limit to 10 suggestions
      setShowSuggestions(uniquePostalCodes.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    
    // Validate on the fly and show the next field if valid
    if (value.match(/^\d{5}$/)) {
      setCodePostalValid(true);
      setShowSuggestions(false);
    } else {
      setCodePostalValid(false);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion: CommuneData) => {
    setCodePostal(suggestion.Codepos);
    setCodePostalValid(true);
    setShowSuggestions(false);
  };

  // Handle year change
  const handleAnneeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnneeConstruction(value);
    
    if (anneeError) setAnneeError('');
    
    // Validate and auto-advance if valid
    if (validateAnnee(value)) {
      onComplete({ 
        codePostal, 
        anneeConstruction: value 
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const codeValid = validateCodePostal(codePostal);
    
    if (!codeValid) return;
    
    if (!anneeConstruction) {
      setCodePostalValid(true);
      return;
    }
    
    const anneeValid = validateAnnee(anneeConstruction);
    
    if (codeValid && anneeValid) {
      onComplete({ 
        codePostal, 
        anneeConstruction 
      });
    }
  };

  // Handle reset code postal
  const handleResetCodePostal = () => {
    setCodePostal('');
    setCodePostalValid(false);
    setAnneeConstruction('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="etape-container">
      <form onSubmit={handleSubmit}>
        <div className="question-block">
          <h2>Quel est le code postal de votre logement ?</h2>
          
          {!codePostalValid ? (
            <div className="input-container">
              <input
                type="text"
                className={`form-control ${codePostalError ? 'error' : ''}`}
                value={codePostal}
                onChange={handleCodePostalChange}
                placeholder="Ex: 75001"
                maxLength={5}
                autoComplete="off"
              />
              {codePostalError && <p className="error-message">{codePostalError}</p>}
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-container">
                  <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                      <li 
                        key={index} 
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="suggestion-item"
                      >
                        {suggestion.Codepos} - {suggestion.Commune}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="selected-option-container">
              <div className="selected-option-content">
                <div className="selected-option-label">
                  Code postal : {codePostal}
                </div>
              </div>
              <div className="selected-option-action">
                <button
                  type="button"
                  className="reset-selected-button"
                  onClick={handleResetCodePostal}
                  aria-label="Modifier le code postal"
                >
                  <RefreshIcon />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {codePostalValid && (
          <div className="question-block">
            <h2>Quelle est l'année de construction de votre logement ?</h2>
            
            <div className="input-container">
              <input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                className={`form-control ${anneeError ? 'error' : ''}`}
                value={anneeConstruction}
                onChange={handleAnneeChange}
                placeholder="Ex: 1997"
                maxLength={4}
                aria-label="Année de construction"
              />
              {anneeError && <p className="error-message">{anneeError}</p>}
            </div>
          </div>
        )}
        
        <div className="step-buttons">
          <button 
            type="submit" 
            className="next-button"
            disabled={!codePostal || (codePostalValid && !anneeConstruction)}
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Etape2_Localisation; 