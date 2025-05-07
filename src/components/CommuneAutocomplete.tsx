import React, { useState, useEffect, useRef } from 'react';
import { Commune, filtrerCommunes, chargerCommunes, getCommunes } from '../data/communes-insee';
import './CommuneAutocomplete.css';

interface CommuneAutocompleteProps {
  value: string;
  onChange: (code: string, nom: string) => void;
  placeholder?: string;
}

const CommuneAutocomplete: React.FC<CommuneAutocompleteProps> = ({ 
  value, 
  onChange,
  placeholder = "Ex: Paris ou 75056" 
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Commune[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  
  // S'assurer que les données des communes sont chargées
  useEffect(() => {
    const loadData = async () => {
      // Vérifier si les données sont déjà chargées
      if (getCommunes().length === 0) {
        setIsLoading(true);
        await chargerCommunes();
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Initialiser la valeur d'entrée
  useEffect(() => {
    if (value && !inputValue) {
      const commune = filtrerCommunes(value).find(c => c.code === value);
      if (commune) {
        setInputValue(`${commune.nom} (${commune.code})`);
        setSelectedCommune(commune);
      } else {
        setInputValue(value);
      }
    }
  }, [value, inputValue]);
  
  // Mettre à jour les suggestions lors de la saisie
  useEffect(() => {
    if (inputValue.length >= 2 && !selectedCommune) {
      const results = filtrerCommunes(inputValue);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [inputValue, selectedCommune]);
  
  // Fermer les suggestions si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedCommune(null);
    onChange('', ''); // Réinitialiser la valeur lorsque l'utilisateur tape
  };
  
  const handleSelectCommune = (commune: Commune) => {
    setSelectedCommune(commune);
    setInputValue(`${commune.nom} (${commune.code})`);
    setIsOpen(false);
    onChange(commune.code, commune.nom);
  };
  
  const handleClear = () => {
    setInputValue('');
    setSelectedCommune(null);
    onChange('', '');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="commune-autocomplete">
      <div className="commune-input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => !selectedCommune && setIsOpen(suggestions.length > 0)}
          placeholder={isLoading ? "Chargement des communes..." : placeholder}
          className="commune-input"
          disabled={isLoading}
        />
        {inputValue && (
          <button 
            type="button" 
            className="commune-clear-button"
            onClick={handleClear}
            aria-label="Effacer"
          >
            ×
          </button>
        )}
      </div>
      
      {isOpen && (
        <div ref={suggestionRef} className="commune-suggestions">
          {suggestions.length > 0 ? (
            suggestions.map((commune) => (
              <div
                key={commune.code}
                className="commune-suggestion-item"
                onClick={() => handleSelectCommune(commune)}
              >
                <span className="commune-nom">{commune.nom}</span>
                <span className="commune-code">{commune.code}</span>
              </div>
            ))
          ) : (
            <div className="no-suggestions">
              {inputValue.length >= 2 ? "Aucune commune trouvée" : "Saisissez au moins 2 caractères"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommuneAutocomplete; 