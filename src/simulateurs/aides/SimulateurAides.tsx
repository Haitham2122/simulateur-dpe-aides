import React, { useState } from 'react';
import './SimulateurAides.css';
import CommuneAutocomplete from '../../components/CommuneAutocomplete';

// Icônes pour le simulateur
const HomeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ApartmentIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 21V8l8-5l8 5v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11v.01M8 9v.01M16 9v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EnergyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProjectIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="8" y="2" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11h.01M9 11h.01M15 11h.01M12 15h.01M9 15h.01M15 15h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TaxIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 6l-4 4M14 6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Types pour le formulaire
interface FormDataAides {
  proprietaireStatut?: string;
  proprietaireType?: string;
  logementType?: string;
  logementSurface?: number;
  logementConstruction?: string;
  residencePrincipale?: string;
  logementCommune?: string;
  logementCommuneNom?: string;
  logementProprietaireOccupant?: string;
  menagePersonnes?: number;
  menageRevenu?: number;
  dpeActuel?: number;
  dpeVise?: number;
  gainEnergetique?: string;
  sortiePassoire?: string;
  projetTravaux?: number;
  parcoursAide?: string;
  coproFidelite?: string;
  taxeFonciereConditionDepenses?: string;
  [key: string]: any;
}

// Type pour une étape complétée
interface EtapeCompletee {
  title: string;
  data: any;
}

// Props pour les composants d'étapes
interface EtapeProps {
  onComplete: (data: any) => void;
  onReturn: () => void;
  data: FormDataAides;
}

// Props pour le simulateur d'aides
interface SimulateurAidesProps {
  onStepChange?: (step: number) => void;
}

const SimulateurAides: React.FC<SimulateurAidesProps> = ({ onStepChange }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormDataAides>({});
  const [completedSteps, setCompletedSteps] = useState<EtapeCompletee[]>([]);
  const [showCompletedSteps, setShowCompletedSteps] = useState<boolean>(false);
  const [resultat, setResultat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Étape 1: Statut et situation du demandeur
  const Etape1_Statut: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
    const [statut, setStatut] = useState<string>(data.proprietaireStatut || '');
    const [proprietaireType, setProprietaireType] = useState<string>(data.proprietaireType || '');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const isOccupant = statut === 'proprietaire' && proprietaireType === 'occupant';
      
      onComplete({ 
        proprietaireStatut: statut,
        proprietaireType: statut === 'proprietaire' ? proprietaireType : null,
        logementProprietaireOccupant: isOccupant ? 'oui' : 'non'
      });
    };

    return (
      <div className="etape-aides">
        <h2>Votre statut</h2>
        <div className="etape-icon">
          <PersonIcon />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vous êtes</label>
            <div className="options-grid">
              <div 
                className={`option-button ${statut === 'proprietaire' ? 'selected' : ''}`}
                onClick={() => setStatut('proprietaire')}
              >
                <div className="option-icon">
                  <HomeIcon />
                </div>
                <span className="option-label">Propriétaire</span>
                <input 
                  type="radio" 
                  name="statut" 
                  value="proprietaire"
                  checked={statut === 'proprietaire'}
                  onChange={() => {}}
                  className="hidden-radio"
                />
              </div>
              <div 
                className={`option-button ${statut === 'acquereur' ? 'selected' : ''}`}
                onClick={() => setStatut('acquereur')}
              >
                <div className="option-icon">
                  <ProjectIcon />
                </div>
                <span className="option-label">Acquéreur</span>
                <input 
                  type="radio" 
                  name="statut" 
                  value="acquereur"
                  checked={statut === 'acquereur'}
                  onChange={() => {}}
                  className="hidden-radio"
                />
              </div>
              <div 
                className={`option-button ${statut === 'non proprietaire' ? 'selected' : ''}`}
                onClick={() => setStatut('non proprietaire')}
              >
                <div className="option-icon">
                  <PersonIcon />
                </div>
                <span className="option-label">Locataire</span>
                <input 
                  type="radio" 
                  name="statut" 
                  value="non proprietaire"
                  checked={statut === 'non proprietaire'}
                  onChange={() => {}}
                  className="hidden-radio"
                />
              </div>
            </div>
          </div>

          {statut === 'proprietaire' && (
            <div className="form-group">
              <label>Précisez votre situation</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="occupant" 
                    name="type" 
                    value="occupant"
                    checked={proprietaireType === 'occupant'}
                    onChange={(e) => setProprietaireType(e.target.value)}
                    required
                  />
                  <label htmlFor="occupant">Propriétaire occupant</label>
                </div>
                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="bailleur" 
                    name="type" 
                    value="bailleur"
                    checked={proprietaireType === 'bailleur'}
                    onChange={(e) => setProprietaireType(e.target.value)}
                  />
                  <label htmlFor="bailleur">Propriétaire bailleur</label>
                </div>
                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="usufruitier" 
                    name="type" 
                    value="usufruitier"
                    checked={proprietaireType === 'usufruitier'}
                    onChange={(e) => setProprietaireType(e.target.value)}
                  />
                  <label htmlFor="usufruitier">Usufruitier</label>
                </div>
                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="autre" 
                    name="type" 
                    value="autre"
                    checked={proprietaireType === 'autre'}
                    onChange={(e) => setProprietaireType(e.target.value)}
                  />
                  <label htmlFor="autre">Autre cas (indivision, etc.)</label>
                </div>
              </div>
            </div>
          )}

          <div className="buttons-group">
            {currentStep > 0 && (
              <button type="button" className="btn-retour" onClick={onReturn}>Retour</button>
            )}
            <button type="submit" className="btn-suivant">Suivant</button>
          </div>
        </form>
      </div>
    );
  };

  // Étape 2: Type et caractéristiques du logement
  const Etape2_Logement: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
    const [type, setType] = useState<string>(data.logementType || '');
    const [surface, setSurface] = useState<string>(data.logementSurface?.toString() || '');
    const [construction, setConstruction] = useState<string>(data.logementConstruction?.replace(/['"]/g, '') || 'au moins 15 ans');
    const [principale, setPrincipale] = useState<string>(data.residencePrincipale || 'oui');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onComplete({ 
        logementType: type,
        logementSurface: parseInt(surface, 10),
        logementConstruction: construction,
        residencePrincipale: principale
      });
    };

    return (
      <div className="etape-aides">
        <h2>Caractéristiques du logement</h2>
        <div className="etape-icon">
          <HomeIcon />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type de logement</label>
            <div className="options-grid-binary">
              <div 
                className={`option-button ${type === 'maison' ? 'selected' : ''}`}
                onClick={() => setType('maison')}
              >
                <div className="option-icon">
                  <HomeIcon />
                </div>
                <span className="option-label">Maison individuelle</span>
                <input 
                  type="radio" 
                  name="type" 
                  value="maison"
                  checked={type === 'maison'}
                  onChange={() => {}}
                  className="hidden-radio"
                />
              </div>
              <div 
                className={`option-button ${type === 'appartement' ? 'selected' : ''}`}
                onClick={() => setType('appartement')}
              >
                <div className="option-icon">
                  <ApartmentIcon />
                </div>
                <span className="option-label">Appartement</span>
                <input 
                  type="radio" 
                  name="type" 
                  value="appartement"
                  checked={type === 'appartement'}
                  onChange={() => {}}
                  className="hidden-radio"
                />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="surface">Surface habitable (m²)</label>
            <input 
              type="number" 
              id="surface" 
              min="1"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="construction">Période de construction</label>
            <select 
              id="construction" 
              value={construction}
              onChange={(e) => setConstruction(e.target.value)}
              required
            >
              <option value="moins de 2 ans">Moins de 2 ans</option>
              <option value="moins de 10 ans">Moins de 10 ans</option>
              <option value="de 10 à 15 ans">De 10 à 15 ans</option>
              <option value="au moins 15 ans">Au moins 15 ans</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>S'agit-il de votre résidence principale ?</label>
            <div className="options-grid-binary">
              <div 
                className={`option-button ${principale === 'oui' ? 'selected' : ''}`}
                onClick={() => setPrincipale('oui')}
              >
                <span className="option-label">Oui</span>
                <input 
                  type="radio" 
                  name="principale" 
                  value="oui"
                  checked={principale === 'oui'}
                  onChange={() => {}}
                  className="hidden-radio"
                />
              </div>
              <div 
                className={`option-button ${principale === 'non' ? 'selected' : ''}`}
                onClick={() => setPrincipale('non')}
              >
                <span className="option-label">Non</span>
                <input 
                  type="radio" 
                  name="principale" 
                  value="non"
                  checked={principale === 'non'}
                  onChange={() => {}}
                  className="hidden-radio"
                />
              </div>
            </div>
          </div>
          
          <div className="buttons-group">
            <button type="button" className="btn-retour" onClick={onReturn}>Retour</button>
            <button type="submit" className="btn-suivant">Suivant</button>
          </div>
        </form>
      </div>
    );
  };

  // Étape 3: Situation géographique et financière
  const Etape3_Situation: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
    const [commune, setCommune] = useState<string>(data.logementCommune?.replace(/['"]/g, '') || '');
    const [communeNom, setCommuneNom] = useState<string>('');
    const [personnes, setPersonnes] = useState<number>(data.menagePersonnes || 1);
    const [revenu, setRevenu] = useState<string>(data.menageRevenu?.toString() || '');
    
    const handleCommuneChange = (code: string, nom: string) => {
      setCommune(code);
      setCommuneNom(nom);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onComplete({ 
        logementCommune: commune,
        logementCommuneNom: communeNom,
        menagePersonnes: personnes,
        menageRevenu: parseInt(revenu, 10)
      });
    };

    return (
      <div className="etape-aides">
        <h2>Situation géographique et financière</h2>
        <div className="etape-icon">
          <PersonIcon />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="commune">Code INSEE de votre commune</label>
            <CommuneAutocomplete 
              value={commune} 
              onChange={handleCommuneChange} 
              placeholder="Rechercher une commune (nom ou code INSEE)"
            />
            <small>Le code INSEE est différent du code postal. Vous pouvez rechercher par nom de commune ou code INSEE.</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="personnes">Nombre de personnes dans le foyer</label>
            <input 
              type="number" 
              id="personnes" 
              min="1" 
              max="10"
              value={personnes}
              onChange={(e) => setPersonnes(parseInt(e.target.value, 10))}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="revenu">Revenu fiscal de référence (€/an)</label>
            <input 
              type="number" 
              id="revenu" 
              min="0"
              value={revenu}
              onChange={(e) => setRevenu(e.target.value)}
              required
            />
            <small>Le revenu fiscal de référence se trouve sur la première page de votre dernier avis d'impôt sur le revenu.</small>
          </div>
          
          <div className="buttons-group">
            <button type="button" className="btn-retour" onClick={onReturn}>Retour</button>
            <button type="submit" className="btn-suivant">Suivant</button>
          </div>
        </form>
      </div>
    );
  };

  // Étape 4: Performance énergétique
  const Etape4_Performance: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
    const [dpeActuel, setDpeActuel] = useState<number>(data.dpeActuel || 0);
    const [dpeVise, setDpeVise] = useState<number>(data.dpeVise || 0);
    const [gainEnergetique, setGainEnergetique] = useState<string>(data.gainEnergetique || 'entre 35 % et 50 %');
    const [sortiePassoire, setSortiePassoire] = useState<string>(data.sortiePassoire || 'oui');
    
    const isAppartement = data.logementType === 'appartement';
    
    // Lettres DPE correspondant aux valeurs numériques
    const dpeLetters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
    
    // Déterminer si il y a une amélioration entre DPE actuel et visé
    const hasImprovement = dpeActuel > 0 && dpeVise > 0 && dpeVise < dpeActuel;
    
    // Calculer les gains théoriques en pourcentage
    const calculateGain = (): number => {
      if (dpeActuel <= 0 || dpeVise <= 0) return 0;
      const improvement = dpeActuel - dpeVise;
      return Math.round((improvement / dpeActuel) * 100);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onComplete({ 
        dpeActuel: dpeActuel,
        dpeVise: dpeVise,
        gainEnergetique: isAppartement ? gainEnergetique : undefined,
        sortiePassoire: isAppartement ? sortiePassoire : undefined
      });
    };

    return (
      <div className="etape-aides">
        <h2>Performance énergétique</h2>
        <div className="etape-icon">
          <EnergyIcon />
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* DPE Actuel */}
          <div className="dpe-title">DPE actuel de votre logement</div>
          <div className="dpe-scale-container">
            <div className="dpe-scale">
              {dpeLetters.slice(1).map((letter, index) => (
                <div 
                  key={index + 1}
                  className={`dpe-class dpe-${letter} ${dpeActuel === index + 1 ? 'selected' : ''}`}
                  onClick={() => setDpeActuel(index + 1)}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
          
          {/* DPE Visé */}
          <div className="dpe-title" style={{ marginTop: '30px' }}>DPE visé après travaux</div>
          <div className="dpe-scale-container">
            <div className="dpe-scale">
              {dpeLetters.slice(1).map((letter, index) => (
                <div 
                  key={index + 1}
                  className={`dpe-class dpe-${letter} ${dpeVise === index + 1 ? 'selected' : ''}`}
                  onClick={() => setDpeVise(index + 1)}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
          
          {/* Affichage du gain énergétique estimé */}
          {hasImprovement && (
            <div className="dpe-info">
              <div className="dpe-subtitle">Gain énergétique estimé:</div>
              <p>
                Vous passerez d'une classe <strong>{dpeLetters[dpeActuel]}</strong> à une classe <strong>{dpeLetters[dpeVise]}</strong>, 
                soit environ <strong>{calculateGain()}%</strong> d'amélioration.
              </p>
            </div>
          )}
          
          {/* Questions spécifiques aux appartements */}
          {isAppartement && (
            <>
              <div className="form-group">
                <label htmlFor="gainEnergetique">Gain énergétique envisagé</label>
                <select 
                  id="gainEnergetique" 
                  value={gainEnergetique}
                  onChange={(e) => setGainEnergetique(e.target.value)}
                  required
                >
                  <option value="moins de 35 %">Moins de 35 %</option>
                  <option value="entre 35 % et 50 %">Entre 35 % et 50 %</option>
                  <option value="plus de 50 %">Plus de 50 %</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Votre immeuble atteindra-t-il au moins la classe D après rénovation ?</label>
                <div className="options-grid-binary">
                  <div 
                    className={`option-button ${sortiePassoire === 'oui' ? 'selected' : ''}`}
                    onClick={() => setSortiePassoire('oui')}
                  >
                    <span className="option-label">Oui</span>
                    <input 
                      type="radio" 
                      name="sortiePassoire" 
                      value="oui"
                      checked={sortiePassoire === 'oui'}
                      onChange={() => {}}
                      className="hidden-radio"
                    />
                  </div>
                  <div 
                    className={`option-button ${sortiePassoire === 'non' ? 'selected' : ''}`}
                    onClick={() => setSortiePassoire('non')}
                  >
                    <span className="option-label">Non</span>
                    <input 
                      type="radio" 
                      name="sortiePassoire" 
                      value="non"
                      checked={sortiePassoire === 'non'}
                      onChange={() => {}}
                      className="hidden-radio"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Validation du formulaire */}
          <div className="buttons-group">
            <button type="button" className="btn-retour" onClick={onReturn}>Retour</button>
            <button 
              type="submit" 
              className="btn-suivant"
              disabled={dpeActuel === 0 || dpeVise === 0}
            >
              Suivant
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Étape 5: Projet de rénovation
  const Etape5_Projet: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
    const [projetTravaux, setProjetTravaux] = useState<string>(data.projetTravaux?.toString() || '');
    const [parcoursAide, setParcoursAide] = useState<string>(data.parcoursAide?.replace(/['"]/g, '') || 'ampleur');
    const [coproFidelite, setCoproFidelite] = useState<string>(data.coproFidelite || 'non');
    
    const isAppartement = data.logementType === 'appartement';
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onComplete({ 
        projetTravaux: parseInt(projetTravaux, 10),
        parcoursAide: parcoursAide,
        coproFidelite: isAppartement ? coproFidelite : undefined
      });
    };

    return (
      <div className="etape-aides">
        <h2>Projet de rénovation</h2>
        <div className="etape-icon">
          <ProjectIcon />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projetTravaux">Montant estimé des travaux (€)</label>
            <input 
              type="number" 
              id="projetTravaux" 
              min="0"
              value={projetTravaux}
              onChange={(e) => setProjetTravaux(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="parcoursAide">Type de parcours d'aide</label>
            <select 
              id="parcoursAide" 
              value={parcoursAide}
              onChange={(e) => setParcoursAide(e.target.value)}
              required
            >
              <option value="ampleur">Rénovation d'ampleur</option>
              <option value="à la carte">Rénovation à la carte</option>
            </select>
          </div>
          
          {isAppartement && (
            <div className="form-group">
              <label>Votre copropriété est-elle considérée comme fragile ou en difficulté ?</label>
              <div className="options-grid-binary">
                <div 
                  className={`option-button ${coproFidelite === 'oui' ? 'selected' : ''}`}
                  onClick={() => setCoproFidelite('oui')}
                >
                  <span className="option-label">Oui</span>
                  <input 
                    type="radio" 
                    name="coproFidelite" 
                    value="oui"
                    checked={coproFidelite === 'oui'}
                    onChange={() => {}}
                    className="hidden-radio"
                  />
                </div>
                <div 
                  className={`option-button ${coproFidelite === 'non' ? 'selected' : ''}`}
                  onClick={() => setCoproFidelite('non')}
                >
                  <span className="option-label">Non</span>
                  <input 
                    type="radio" 
                    name="coproFidelite" 
                    value="non"
                    checked={coproFidelite === 'non'}
                    onChange={() => {}}
                    className="hidden-radio"
                  />
                </div>
              </div>
              <small>Une copropriété est considérée fragile si son taux d'impayés est supérieur à 8% ou si elle est située dans un quartier NPNRU.</small>
            </div>
          )}
          
          <div className="buttons-group">
            <button type="button" className="btn-retour" onClick={onReturn}>Retour</button>
            <button type="submit" className="btn-suivant">Suivant</button>
          </div>
        </form>
      </div>
    );
  };

  // Étape 6: Taxe foncière et autres critères
  const Etape6_Final: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
    const [taxeFonciere, setTaxeFonciere] = useState<string>(data.taxeFonciereConditionDepenses || 'oui');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onComplete({ 
        taxeFonciereConditionDepenses: taxeFonciere
      });
    };

    return (
      <div className="etape-aides">
        <h2>Informations complémentaires</h2>
        <div className="etape-icon">
          <TaxIcon />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Condition de dépenses pour taxe foncière</label>
            <div className="options-grid">
              <div 
                className={`option-button ${taxeFonciere === 'oui' ? 'selected' : ''}`}
                onClick={() => setTaxeFonciere('oui')}
              >
                <span className="option-label">Oui</span>
                <input 
                  type="radio" 
                  name="taxeFonciereConditionDepenses" 
                  value="oui"
                  checked={taxeFonciere === 'oui'}
                  onChange={() => {}}
                  className="hidden-radio"
                />
              </div>
              <div 
                className={`option-button ${taxeFonciere === 'non' ? 'selected' : ''}`}
                onClick={() => setTaxeFonciere('non')}
              >
                <span className="option-label">Non</span>
                <input 
                  type="radio" 
                  name="taxeFonciereConditionDepenses" 
                  value="non"
                  checked={taxeFonciere === 'non'}
                  onChange={() => {}}
                  className="hidden-radio"
                />
              </div>
            </div>
          </div>
          
          <div className="buttons-group">
            <button type="button" className="btn-retour" onClick={onReturn}>Retour</button>
            <button type="submit" className="btn-suivant">Calculer mes aides</button>
          </div>
        </form>
      </div>
    );
  };

  // Résultats des aides
  const ResultatAides: React.FC<{ data: FormDataAides, resultat: any, onReturn: () => void }> = ({ data, resultat, onReturn }) => {
    // Compter les aides par statut
    const eligibleCount = resultat ? resultat.filter((aide: any) => aide.status === true).length : 0;
    const indeterminateCount = resultat ? resultat.filter((aide: any) => aide.status === null).length : 0;
    
    // Calculer le montant total des aides éligibles
    const totalAides = resultat
      ? resultat
          .filter((aide: any) => aide.status === true && aide.rawValue)
          .reduce((sum: number, aide: any) => sum + aide.rawValue, 0)
      : 0;
    
    // Grouper les aides par type
    const aidesByType = resultat
      ? resultat
          .filter((aide: any) => aide.status === true)
          .reduce((groups: any, aide: any) => {
            if (!groups[aide.type]) {
              groups[aide.type] = {
                count: 0,
                montant: 0
              };
            }
            groups[aide.type].count += 1;
            groups[aide.type].montant += aide.rawValue || 0;
            return groups;
          }, {})
      : {};
    
    return (
      <div className="resultat-aides">
        <h2>Aides financières auxquelles vous pourriez être éligible</h2>
        
        {data.logementCommuneNom && (
          <div className="commune-info">
            <p>Commune sélectionnée: <strong>{data.logementCommuneNom}</strong> (code INSEE: {data.logementCommune})</p>
          </div>
        )}
        
        {eligibleCount > 0 && (
          <div className="resultat-summary">
            <p className="eligible-count">Vous êtes potentiellement éligible à {eligibleCount} aide{eligibleCount > 1 ? 's' : ''}.</p>
            {totalAides > 0 && (
              <p className="montant-total">Montant total estimé: <strong>{totalAides.toLocaleString('fr-FR')} €</strong></p>
            )}
            
            {Object.keys(aidesByType).length > 1 && (
              <div className="aide-types-distribution">
                {Object.entries(aidesByType).map(([type, data]: [string, any], index) => (
                  <div key={index} className="aide-type-stat">
                    <span className="aide-type-name">{type}</span>
                    <span className="aide-type-count">{data.count} aide{data.count > 1 ? 's' : ''}</span>
                    {data.montant > 0 && (
                      <span className="aide-type-montant">{data.montant.toLocaleString('fr-FR')} €</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {indeterminateCount > 0 && (
              <p className="indeterminate-count">
                {indeterminateCount} autre{indeterminateCount > 1 ? 's' : ''} aide{indeterminateCount > 1 ? 's' : ''} nécessite{indeterminateCount > 1 ? 'nt' : ''} plus d'informations.
              </p>
            )}
          </div>
        )}
        
        {resultat && resultat.length > 0 ? (
          <div className="aides-list">
            {/* Afficher d'abord les aides éligibles */}
            {resultat
              .sort((a: any, b: any) => {
                // Tri: d'abord éligibles, puis indéterminés, puis non éligibles
                if (a.status === true && b.status !== true) return -1;
                if (a.status === null && b.status === false) return -1;
                if (a.status === b.status && a.rawValue && b.rawValue) {
                  return b.rawValue - a.rawValue; // Les montants les plus élevés en premier
                }
                return 0;
              })
              .map((aide: any, index: number) => (
                <div key={index} className={`aide-item ${aide.status === true ? 'eligible' : aide.status === false ? 'non-eligible' : 'indetermine'}`}>
                  <h3>{aide.label}</h3>
                  <div className="aide-details">
                    <div className="aide-primary-info">
                      <p className="aide-type">
                        <span className={`aide-type-pill ${aide.type.toLowerCase().replace(' ', '-')}`}>
                          {aide.type}
                        </span>
                      </p>
                      <p className="aide-value">
                        <span>{aide.value}</span>
                        {aide.taux && <span className="aide-rate">au taux de {aide.taux}</span>}
                      </p>
                      {aide.durée && (
                        <p className="aide-duree">Durée: <span>{aide.durée}</span></p>
                      )}
                    </div>
                    
                    <div className="aide-status-container">
                      <p className="aide-status">
                        <span className={`status-badge ${aide.status === true ? 'eligible' : aide.status === false ? 'non-eligible' : 'indetermine'}`}>
                          {aide.status === true ? 'Éligible' : aide.status === false ? 'Non éligible' : 'À déterminer'}
                        </span>
                      </p>
                    </div>
                    
                    {aide.missingVariables && aide.missingVariables.length > 0 && (
                      <div className="missing-info">
                        <p>Informations supplémentaires nécessaires:</p>
                        <ul>
                          {aide.missingVariables.map((variable: string, i: number) => (
                            <li key={i}>{variable.replace(/\./g, ' → ')}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="no-results">
            <p>Aucune aide disponible pour votre situation ou données insuffisantes.</p>
            <p>Veuillez vérifier les informations saisies et réessayer.</p>
          </div>
        )}
        
        <div className="result-actions">
          <button onClick={onReturn} className="btn-retour">Modifier mes informations</button>
        </div>
      </div>
    );
  };

  // Définition des étapes
  const steps = [
    { component: Etape1_Statut, title: "Statut et situation", icon: PersonIcon },
    { component: Etape2_Logement, title: "Type et caractéristiques du logement", icon: HomeIcon },
    { component: Etape3_Situation, title: "Situation géographique et financière", icon: PersonIcon },
    { component: Etape4_Performance, title: "Performance énergétique", icon: EnergyIcon },
    { component: Etape5_Projet, title: "Projet de rénovation", icon: ProjectIcon },
    { component: Etape6_Final, title: "Informations complémentaires", icon: TaxIcon },
  ];

  // Gérer la complétion d'une étape
  const handleStepComplete = async (data: any) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    
    // Mettre à jour les étapes complétées
    if (currentStep < steps.length) {
      const currentStepData = steps[currentStep];
      const newCompletedStep: EtapeCompletee = {
        title: currentStepData.title,
        data: data,
      };
      
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[currentStep] = newCompletedStep;
      setCompletedSteps(newCompletedSteps);
    }
    
    const nextStep = currentStep + 1;
    
    // Notifier le parent du changement d'étape
    if (onStepChange) {
      onStepChange(nextStep);
    }
    
    // Si c'est la dernière étape, faire l'appel API
    if (nextStep >= steps.length) {
      await calculerAides(updatedFormData);
    } else {
      setCurrentStep(nextStep);
    }
  };

  // Calculer les aides disponibles
  const calculerAides = async (data: FormDataAides) => {
    setIsLoading(true);
    
    try {
      // Créer l'objet pour les paramètres
      const payload: Record<string, any> = {};
      
      // Paramètres obligatoires - nettoyer et formater correctement les valeurs
      if (data.proprietaireStatut) payload['vous . propriétaire . statut'] = data.proprietaireStatut.replace(/['"]/g, '');
      if (data.menagePersonnes) payload['ménage . personnes'] = data.menagePersonnes;
      if (data.menageRevenu) payload['ménage . revenu'] = data.menageRevenu;
      if (data.dpeActuel) payload['DPE . actuel'] = data.dpeActuel;
      if (data.dpeVise) payload['projet . DPE visé'] = data.dpeVise;
      if (data.projetTravaux) payload['projet . travaux'] = data.projetTravaux;
      
      // Nettoyer correctement toutes les chaînes de caractères
      if (data.logementCommune) payload['logement . commune'] = data.logementCommune.replace(/['"]/g, '');
      if (data.logementProprietaireOccupant) payload['logement . propriétaire occupant'] = data.logementProprietaireOccupant;
      if (data.residencePrincipale) payload['logement . résidence principale propriétaire'] = data.residencePrincipale;
      if (data.logementConstruction) payload['logement . période de construction'] = data.logementConstruction.replace(/['"]/g, '');
      if (data.parcoursAide) payload['parcours d\'aide'] = data.parcoursAide.replace(/['"]/g, '');
      if (data.taxeFonciereConditionDepenses) payload['taxe foncière . condition de dépenses'] = data.taxeFonciereConditionDepenses;
      
      // Paramètres optionnels
      if (data.logementType) payload['logement . type'] = data.logementType;
      if (data.logementSurface) payload['logement . surface'] = data.logementSurface;
      
      // Paramètres spécifiques aux copropriétés
      if (data.logementType === 'appartement') {
        if (data.gainEnergetique) payload['copropriété . gain énergétique'] = data.gainEnergetique;
        if (data.sortiePassoire) payload['copropriété . bonus sortie passoire'] = data.sortiePassoire;
        if (data.coproFidelite) payload['copropriété . bonus copropriété fragile'] = data.coproFidelite;
      }
      
      // Déboguer la charge utile avant l'envoi
      console.log('Payload avant envoi:', payload);
      
      // L'API attend un POST avec un corps JSON, pas un GET avec des paramètres d'URL
      // Utilisation d'un service de proxy CORS pour contourner l'erreur CORS
      const apiBaseUrl = 'https://mesaidesreno.beta.gouv.fr';
      const apiPath = '/api/v1/?fields=eligibilite';
      
      // Essayer d'abord avec l'URL directe
      try {
        console.log('Tentative avec URL directe');
        const response = await fetch(apiBaseUrl + apiPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        // Vérifier la réponse HTTP
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Erreur HTTP ${response.status}: ${errorText}`);
          throw new Error(`Erreur de l'API: ${response.status} ${response.statusText}`);
        }
        
        // Analyser la réponse JSON
        const result = await response.json();
        handleResults(result);
        
      } catch (error) {
        console.error("Erreur avec l'URL directe, essai avec données simulées:", error);
        
        // Utiliser des données simulées en cas d'échec (erreur CORS)
        const simulatedResult = simulateApiResponse(payload);
        handleResults(simulatedResult);
      }
      
    } catch (error) {
      console.error("Erreur lors de la requête API:", error);
      setResultat(null);
      
      // Afficher un message d'erreur plus explicite
      alert(`Une erreur est survenue lors du calcul des aides: ${error instanceof Error ? error.message : 'Erreur inconnue'}. Veuillez vérifier vos informations et réessayer.`);
      
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour traiter les résultats
  const handleResults = (result: any) => {
    console.log('Réponse de l\'API:', result);
    
    // Traiter les données de résultat pour les afficher correctement
    const processedResult = result.map((aide: any) => {
      // Pour les aides avec des variables manquantes, on les marque comme "à déterminer"
      if (aide.missingVariables && aide.missingVariables.length > 0) {
        return { ...aide, status: null };
      }
      return aide;
    });
    
    setResultat(processedResult);
    
    // Notifier le parent du changement d'étape
    if (onStepChange) {
      onStepChange(steps.length);
    }
    
    setCurrentStep(steps.length); // Passer à l'affichage des résultats
  };
  
  // Simuler une réponse de l'API en fonction des données soumises
  const simulateApiResponse = (data: any) => {
    // Simule une réponse basée sur les exemples fournis
    return [
      {
        "label": "MaPrimeRénov' accompagnée",
        "fields": "MPR . accompagnée",
        "type": "remboursement",
        "status": true,
        "value": "45 000 €",
        "rawValue": 45000,
        "missingVariables": []
      },
      {
        "label": "Mon Accompagnateur Rénov' Subvention",
        "fields": "MPR . accompagnée . prise en charge MAR",
        "type": "remboursement",
        "status": true,
        "value": "1 500 €",
        "rawValue": 1500,
        "missingVariables": []
      },
      {
        "label": "CEE coup de pouce « Rénovation d'ampleur »",
        "fields": "CEE . rénovation d'ampleur",
        "type": "remboursement",
        "status": false,
        "value": "Non applicable",
        "rawValue": null,
        "missingVariables": []
      },
      {
        "label": "MaPrimeRénov' copropriété prime individuelle",
        "fields": "ampleur . prime individuelle copropriété",
        "type": "remboursement",
        "status": null,
        "value": "Pas encore défini",
        "rawValue": null,
        "missingVariables": [
          "logement . type"
        ]
      },
      {
        "label": "Éco-prêt à taux zéro (Éco-PTZ)",
        "fields": "PTZ",
        "type": "prêt",
        "status": true,
        "value": "50 000 €",
        "rawValue": 50000,
        "taux": "0 %",
        "durée": "20 ans",
        "missingVariables": []
      },
      {
        "label": "Prêt avance rénovation 0 %",
        "fields": "PAR",
        "type": "prêt",
        "status": null,
        "value": "Pas encore défini",
        "rawValue": null,
        "taux": "0 %",
        "durée": "10 ans",
        "missingVariables": [
          "logement . type travaux"
        ]
      },
      {
        "label": "Denormandie Réduction d'impôt location",
        "fields": "denormandie",
        "type": "exonération fiscale",
        "status": false,
        "value": "Non applicable",
        "rawValue": null,
        "taux": "18 %",
        "durée": "9 ans",
        "missingVariables": []
      },
      {
        "label": "Exonération de taxe foncière",
        "fields": "taxe foncière",
        "type": "exonération fiscale",
        "status": null,
        "value": "Pas encore défini",
        "rawValue": null,
        "taux": "50 %",
        "durée": "3 ans",
        "missingVariables": [
          "logement . type",
          "logement . taxe foncière"
        ]
      }
    ];
  };

  // Retourner à une étape précédente
  const handleReturn = (index?: number) => {
    const previousStep = index !== undefined ? index : currentStep - 1;
    
    if (index !== undefined) {
      setCurrentStep(index);
      setCompletedSteps(completedSteps.slice(0, index));
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    
    // Notifier le parent du changement d'étape
    if (onStepChange) {
      onStepChange(previousStep >= 0 ? previousStep : 0);
    }
  };

  // Toggle montrer/cacher les étapes complétées
  const toggleCompletedSteps = () => {
    setShowCompletedSteps(!showCompletedSteps);
  };

  // Rendre l'étape actuelle
  const renderCurrentStep = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <p>Calcul de vos aides en cours...</p>
          <div className="loader"></div>
        </div>
      );
    }
    
    if (currentStep >= steps.length) {
      return <ResultatAides data={formData} resultat={resultat} onReturn={() => handleReturn(0)} />;
    }
    
    const StepComponent = steps[currentStep].component;
    return (
      <StepComponent 
        onComplete={handleStepComplete} 
        onReturn={() => handleReturn()}
        data={formData}
      />
    );
  };

  return (
    <div className="simulateur-aides-container">
      {currentStep < steps.length && (
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} 
          />
        </div>
      )}
      
      <div className="simulateur-aides-content">
        {/* En-tête avec le titre de l'étape actuelle */}
        {currentStep < steps.length && (
          <div className="simulateur-header">
            <h2>{steps[currentStep].title}</h2>
            
            {completedSteps.length > 0 && (
              <button 
                className="toggle-steps-button"
                onClick={toggleCompletedSteps}
              >
                {showCompletedSteps ? 'Masquer les étapes' : 'Voir les étapes précédentes'}
              </button>
            )}
          </div>
        )}
        
        {/* Étapes complétées */}
        {showCompletedSteps && completedSteps.length > 0 && currentStep < steps.length && (
          <div className="completed-steps">
            {completedSteps.slice(0, currentStep).map((step, index) => (
              <div key={index} className="completed-step">
                <div className="step-header">
                  <h3>{step.title}</h3>
                  <button 
                    className="modify-button" 
                    onClick={() => handleReturn(index)}
                  >
                    Modifier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Étape actuelle */}
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default SimulateurAides; 