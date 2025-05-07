import React, { useState, FormEvent, ChangeEvent } from 'react';
import { EtapeProps } from '../types/types';

const Etape3_AnneeConstruction: React.FC<EtapeProps> = ({ onComplete, data }) => {
  const [anneeConstruction, setAnneeConstruction] = useState<string>(data?.anneeConstruction || '');
  const [error, setError] = useState<string>('');
  
  // Current year
  const currentYear = new Date().getFullYear();

  // Validate and complete this step
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation for year (4 digits and not in the future)
    if (!anneeConstruction.match(/^\d{4}$/)) {
      setError('Veuillez entrer une année valide (4 chiffres)');
      return;
    }
    
    const year = parseInt(anneeConstruction, 10);
    if (year > currentYear) {
      setError('L\'année ne peut pas être dans le futur');
      return;
    }
    
    if (year < 1800) {
      setError('L\'année semble trop ancienne, veuillez vérifier');
      return;
    }
    
    onComplete({ anneeConstruction });
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnneeConstruction(value);
    
    // Clear error when user types
    if (error) setError('');
    
    // Automatically advance if valid and in acceptable range
    if (value.match(/^\d{4}$/)) {
      const year = parseInt(value, 10);
      if (year <= currentYear && year >= 1800) {
        onComplete({ anneeConstruction: value });
      }
    }
  };

  return (
    <div className="etape-container">
      <h2>Quelle est l'année de construction de votre logement ?</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="anneeConstruction">Année de construction</label>
          <input
            type="number"
            id="anneeConstruction"
            className={`form-control ${error ? 'error' : ''}`}
            value={anneeConstruction}
            onChange={handleChange}
            placeholder="Ex: 1997"
            min="1800"
            max={currentYear}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <div className="step-buttons">
          <button 
            type="submit" 
            className="next-button"
            disabled={!anneeConstruction}
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Etape3_AnneeConstruction; 