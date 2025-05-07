import React, { useState, ChangeEvent, FormEvent } from 'react';
import { EtapeProps, Civilite } from '../types/types';
import './Etape5_Chauffage.css'; // Réutilisation du style

const Etape7_InfosUtilisateur: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
  const [civilite, setCivilite] = useState<Civilite>(data?.civilite || null);
  const [prenom, setPrenom] = useState<string>(data?.prenom || '');
  const [nom, setNom] = useState<string>(data?.nom || '');
  const [email, setEmail] = useState<string>(data?.email || '');
  const [telephone, setTelephone] = useState<string>(data?.telephone || '');
  const [newsletter, setNewsletter] = useState<boolean>(data?.newsletter || false);
  const [acceptConditions, setAcceptConditions] = useState<boolean>(data?.acceptConditions || false);
  
  // Validation des erreurs
  const [emailError, setEmailError] = useState<string>('');
  const [telephoneError, setTelephoneError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  
  // Gestion de la civilité
  const handleCiviliteChange = (value: Civilite) => {
    setCivilite(value);
  };
  
  // Validation de l'email
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };
  
  // Validation du téléphone (format français)
  const validatePhone = (phone: string) => {
    const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return re.test(phone);
  };
  
  // Formater le téléphone
  const formatPhone = (phone: string) => {
    // Supprime tous les caractères non numériques
    let cleaned = phone.replace(/\D/g, '');
    
    // Format français: XX XX XX XX XX
    if (cleaned.startsWith('33')) {
      cleaned = '0' + cleaned.substring(2);
    }
    
    // Ajoute des espaces
    if (cleaned.length > 0) {
      cleaned = cleaned.match(/.{1,2}/g)?.join(' ') || cleaned;
    }
    
    return cleaned;
  };
  
  // Gestion du changement des champs
  const handlePrenom = (e: ChangeEvent<HTMLInputElement>) => {
    setPrenom(e.target.value);
  };
  
  const handleNom = (e: ChangeEvent<HTMLInputElement>) => {
    setNom(e.target.value);
  };
  
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (emailError && validateEmail(value)) {
      setEmailError('');
    }
  };
  
  const handleTelephone = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhone(value);
    setTelephone(formattedValue);
    
    if (telephoneError && validatePhone(formattedValue)) {
      setTelephoneError('');
    }
  };
  
  const handleNewsletter = (e: ChangeEvent<HTMLInputElement>) => {
    setNewsletter(e.target.checked);
  };
  
  const handleConditions = (e: ChangeEvent<HTMLInputElement>) => {
    setAcceptConditions(e.target.checked);
    
    if (e.target.checked && formError) {
      setFormError('');
    }
  };
  
  // Soumission du formulaire
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    let isValid = true;
    
    if (!civilite) {
      setFormError('Veuillez sélectionner une civilité');
      isValid = false;
    } else if (!prenom || !nom) {
      setFormError('Veuillez entrer votre prénom et nom');
      isValid = false;
    } else if (!email) {
      setEmailError('Veuillez entrer votre email');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Veuillez entrer un email valide');
      isValid = false;
    } else if (telephone && !validatePhone(telephone)) {
      setTelephoneError('Veuillez entrer un numéro de téléphone valide');
      isValid = false;
    } else if (!acceptConditions) {
      setFormError('Vous devez accepter les conditions générales');
      isValid = false;
    }
    
    if (isValid) {
      onComplete({
        civilite,
        prenom,
        nom,
        email,
        telephone,
        newsletter,
        acceptConditions
      });
    }
  };
  
  return (
    <div className="etape-container">
      <form onSubmit={handleSubmit}>
        <h2>Vos informations</h2>
        
        <div className="form-group">
          <label>Civilité</label>
          <div className="options-grid options-grid-binary">
            <div 
              className={`option-button ${civilite === 'monsieur' ? 'selected' : ''}`}
              onClick={() => handleCiviliteChange('monsieur')}
            >
              <span className="option-label">Monsieur</span>
            </div>
            <div 
              className={`option-button ${civilite === 'madame' ? 'selected' : ''}`}
              onClick={() => handleCiviliteChange('madame')}
            >
              <span className="option-label">Madame</span>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="prenom">Prénom *</label>
          <input
            type="text"
            id="prenom"
            className="form-control"
            value={prenom}
            onChange={handlePrenom}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="nom">Nom *</label>
          <input
            type="text"
            id="nom"
            className="form-control"
            value={nom}
            onChange={handleNom}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            className={`form-control ${emailError ? 'error' : ''}`}
            value={email}
            onChange={handleEmail}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="telephone">Téléphone</label>
          <input
            type="tel"
            id="telephone"
            className={`form-control ${telephoneError ? 'error' : ''}`}
            value={telephone}
            onChange={handleTelephone}
            placeholder="06 XX XX XX XX"
          />
          {telephoneError && <p className="error-message">{telephoneError}</p>}
        </div>
        
        <div className="checkbox-group checkbox-row">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="newsletter"
              checked={newsletter}
              onChange={handleNewsletter}
            />
            <label htmlFor="newsletter">
              Je souhaite recevoir la newsletter
            </label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="conditions"
              checked={acceptConditions}
              onChange={handleConditions}
              required
            />
            <label htmlFor="conditions">
              J'accepte les <a href="https://www.example.com/conditions" target="_blank" rel="noopener noreferrer">conditions générales</a> d'utilisation *
            </label>
          </div>
        </div>
        
        {formError && <p className="error-message">{formError}</p>}
        
        <div className="step-buttons">
          <button 
            type="submit" 
            className="next-button"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default Etape7_InfosUtilisateur; 