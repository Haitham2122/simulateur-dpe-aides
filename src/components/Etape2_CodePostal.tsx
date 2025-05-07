import React, { useState, FormEvent, ChangeEvent } from 'react';
import { EtapeProps } from '../types/types';

const Etape2_CodePostal: React.FC<EtapeProps> = ({ onComplete, data }) => {
  const [codePostal, setCodePostal] = useState<string>(data?.codePostal || '');
  const [error, setError] = useState<string>('');

  // Validate and complete this step
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation for French postal codes (5 digits)
    if (!codePostal.match(/^\d{5}$/)) {
      setError('Veuillez entrer un code postal valide (5 chiffres)');
      return;
    }
    
    onComplete({ codePostal });
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCodePostal(value);
    
    // Clear error when user types
    if (error) setError('');
    
    // Automatically advance if valid
    if (value.match(/^\d{5}$/)) {
      onComplete({ codePostal: value });
    }
  };

  return (
    <div className="etape-container">
      <h2>Quel est le code postal de votre logement ?</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="codePostal">Code postal</label>
          <input
            type="text"
            id="codePostal"
            className={`form-control ${error ? 'error' : ''}`}
            value={codePostal}
            onChange={handleChange}
            placeholder="Ex: 75001"
            maxLength={5}
            autoComplete="postal-code"
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <div className="step-buttons">
          <button 
            type="submit" 
            className="next-button"
            disabled={!codePostal}
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Etape2_CodePostal; 