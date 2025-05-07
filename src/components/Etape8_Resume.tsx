import React, { useState, useEffect } from 'react';
import { EtapeProps, FormData, EnergieChauffage } from '../types/types';
import './Etape5_Chauffage.css'; // Réutilisation du style
import './Etape8_Resume.css'; // Styles spécifiques

// Import des images SVG
import IsolationToitImg from '../assets/images/isolation_toit.a8b6bc4128cb6cee9999.svg';
import PompeAChaleurImg from '../assets/images/installation_pompe_a_chaleur_air_eau.5579597aab2a4604d680.svg';
import ChauffeEauImg from '../assets/images/installation_chauffe_eau_thermo.c36b5def0d36d3630c07.svg';
import MaisonDPImg from '../assets/images/dp-house.d607c205fd8795c7ec543279b4542e3b.svg';
import ValoVerteImg from '../assets/images/valo-verte.a3a4f4b69f9433b358df3ab43c68b565.svg';
import VMCImg from '../assets/images/vmc.svg';

// Import des fonctions de calcul thermique
import { 
  calculerDPE, 
  simulerEtiquetteApres, 
  calculerEconomiesFinancieres, 
  calculerEconomiesCO2,
  ResultatDPE,
  obtenirDJU
} from '../utils/calculThermique';

// Interfaces pour les résultats
interface Travaux {
  titre: string;
  description: string;
  priorite: number; // 1 à 3 (1 = le plus prioritaire)
  duree: string; // temps estimé des travaux
  economie: string; // économies potentielles par an
  cout: string; // coût estimé
  impact: 'faible' | 'moyen' | 'important';
  image: string; // URL de l'image illustrant les travaux
}

// Interface pour les bénéfices après travaux
interface Benefices {
  etiquetteAvant: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  etiquetteApres: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  economieEuros: number;
  economieKWh: number;
  pourcentageEconomie: number;
  economieGES: {
    kgCO2: number;
    kmVoiture: number;
  };
}

// Interface pour les coefficients thermiques
interface CoefficientsThermiques {
  murs: number;
  toiture: number;
  plancher: number;
  fenetres: number;
  ventilation: number;
  pontsThermiques: number;
}

// Interface pour les surfaces thermiques du bâtiment
interface SurfacesThermiques {
  murs: number;
  toiture: number;
  plancher: number;
  fenetres: number;
}

// Interface pour le coût du chauffage
interface CoutChauffage {
  prixKWh: number;
  rendement: number;
}

const Etape8_Resume: React.FC<EtapeProps> = ({ onComplete, onReturn, data }) => {
  const [resultat, setResultat] = useState<ResultatDPE | null>(null);
  const [travaux, setTravaux] = useState<Travaux[]>([]);
  const [benefices, setBenefices] = useState<Benefices | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("performance");
  const [travauxSelectionnes, setTravauxSelectionnes] = useState<string[]>([]);

  // Calculer le DPE en fonction des données fournies
  useEffect(() => {
    // Simuler un chargement
    setLoading(true);
    
    // Simuler un calcul asynchrone
    const timer = setTimeout(() => {
      const resultatCalcule = calculerDPE(data);
      const suggestionsCalculees = genererSuggestionsTravaux(data, resultatCalcule);
      
      setResultat(resultatCalcule);
      setTravaux(suggestionsCalculees);
      
      // Par défaut, sélectionner les travaux prioritaires pour simuler l'après-travaux
      const travauxPrioritaires = suggestionsCalculees
        .filter(travail => travail.priorite === 1)
        .map(travail => travail.titre);
      
      setTravauxSelectionnes(travauxPrioritaires);
      
      // Calculer les bénéfices après travaux
      if (travauxPrioritaires.length > 0) {
        const resultatApres = simulerEtiquetteApres(resultatCalcule, data, travauxPrioritaires);
        const economiesFinancieres = calculerEconomiesFinancieres(resultatCalcule, resultatApres, data);
        const economiesCO2 = calculerEconomiesCO2(resultatCalcule, resultatApres, data);
        
        setBenefices({
          etiquetteAvant: resultatCalcule.etiquette,
          etiquetteApres: resultatApres.etiquette,
          economieEuros: economiesFinancieres.economie,
          economieKWh: Math.round((resultatCalcule.valeurEnergie - resultatApres.valeurEnergie) * parseFloat(data.surface || '100')),
          pourcentageEconomie: economiesFinancieres.pourcentage,
          economieGES: economiesCO2
        });
      }
      
      setLoading(false);
    }, 1000); // Simuler un délai de calcul
    
    return () => clearTimeout(timer);
  }, [data]);

  // Fonction pour générer des suggestions de travaux
  const genererSuggestionsTravaux = (data: FormData, resultat: ResultatDPE): Travaux[] => {
    const suggestions: Travaux[] = [];

    // 1. Analyser l'état des différents postes pour identifier les priorités
    const { etatPostes, etiquette, pertes } = resultat;
    
    // 2. Isolation des combles si mauvais état
    if (etatPostes.combles === 'Mauvais' || 
        (etatPostes.combles === 'Moyen' && pertes.combles > 15) || 
        (data.typeBien === 'maison' || data.emplacementAppartement === 'dernier_etage')) {
      suggestions.push({
        titre: "Isolation des combles",
        description: `L'isolation de vos combles permettrait de réduire d'environ ${pertes.combles}% vos pertes thermiques.`,
        priorite: etatPostes.combles === 'Mauvais' ? 1 : 2,
        duree: "2 à 5 jours",
        economie: "15% à 25% sur votre facture annuelle",
        cout: "40€ à 70€ par m²",
        impact: pertes.combles > 20 ? 'important' : 'moyen',
        image: IsolationToitImg
      });
    }

    // 3. Isolation des murs si mauvais état
    if (etatPostes.murs === 'Mauvais' || (etatPostes.murs === 'Moyen' && pertes.murs > 20)) {
      suggestions.push({
        titre: "Isolation des murs par l'extérieur",
        description: `L'isolation de vos murs permettrait de réduire d'environ ${pertes.murs}% vos pertes thermiques.`,
        priorite: etatPostes.murs === 'Mauvais' ? 1 : 2,
        duree: "1 à 2 semaines",
        economie: "20% à 30% sur votre facture annuelle",
        cout: "100€ à 150€ par m²",
        impact: pertes.murs > 25 ? 'important' : 'moyen',
        image: "" // À compléter
      });
    }

    // 4. Isolation du plancher si mauvais état
    if (etatPostes.sols === 'Mauvais' && (data.typeBien === 'maison' || data.emplacementAppartement === 'rez_de_chaussee')) {
      suggestions.push({
        titre: "Isolation du plancher",
        description: `L'isolation de votre plancher permettrait de réduire d'environ ${pertes.plancher}% vos pertes thermiques.`,
        priorite: etatPostes.sols === 'Mauvais' ? 2 : 3,
        duree: "3 à 7 jours",
        economie: "5% à 10% sur votre facture annuelle",
        cout: "30€ à 70€ par m²",
        impact: pertes.plancher > 15 ? 'moyen' : 'faible',
        image: "" // À compléter
      });
    }

    // 5. Remplacement des fenêtres si mauvais état
    if (etatPostes.fenetres === 'Mauvais' || (etatPostes.fenetres === 'Moyen' && data.typeVitrage === 'simple')) {
      suggestions.push({
        titre: "Remplacement des fenêtres",
        description: `Le remplacement de vos fenêtres permettrait de réduire d'environ ${pertes.fenetres}% vos pertes thermiques et d'améliorer le confort.`,
        priorite: etatPostes.fenetres === 'Mauvais' ? 2 : 3,
        duree: "2 à 5 jours",
        economie: "10% à 15% sur votre facture annuelle",
        cout: "400€ à 600€ par fenêtre",
        impact: pertes.fenetres > 15 ? 'moyen' : 'faible',
        image: "" // À compléter
      });
    }

    // 6. Système de chauffage si mauvais état ou énergie fossile
    if (etatPostes.chauffage === 'Mauvais' || data.energiePrincipale === 'fioul' || 
        (data.energiePrincipale === 'electrique' && ['F', 'G', 'E'].includes(etiquette))) {
      suggestions.push({
        titre: "Installation d'une pompe à chaleur",
        description: "Le remplacement de votre système de chauffage par une pompe à chaleur permettrait de diviser par 3 votre consommation d'énergie.",
        priorite: etatPostes.chauffage === 'Mauvais' ? 1 : 2,
        duree: "2 à 4 jours",
        economie: "50% à 70% sur votre facture annuelle",
        cout: "10 000€ à 15 000€",
        impact: 'important',
        image: PompeAChaleurImg
      });
    }

    // 7. Eau chaude sanitaire (ECS) si électrique et mauvaise étiquette énergétique
    // On suppose que l'eau chaude est produite avec la même énergie que le chauffage
    if (data.energiePrincipale === 'electrique' && ['E', 'F', 'G'].includes(etiquette)) {
      suggestions.push({
        titre: "Installation d'un chauffe-eau thermodynamique",
        description: "Un chauffe-eau thermodynamique permettrait de diviser par 3 votre consommation d'énergie pour l'eau chaude.",
        priorite: 3,
        duree: "1 jour",
        economie: "70% sur la partie eau chaude",
        cout: "3 000€ à 4 000€",
        impact: 'moyen',
        image: ChauffeEauImg
      });
    }

    // 8. Ventilation si aucun système
    if (data.ventilation === 'aucune' || !data.ventilation) {
      suggestions.push({
        titre: "Installation d'une VMC",
        description: "Une ventilation mécanique contrôlée permettrait d'améliorer la qualité de l'air tout en limitant les déperditions thermiques.",
        priorite: ['E', 'F', 'G'].includes(etiquette) ? 2 : 3,
        duree: "1 à 2 jours",
        economie: "5% à 10% sur votre facture annuelle",
        cout: "1 500€ à 2 500€",
        impact: 'moyen',
        image: VMCImg
      });
    }

    // 9. Si l'étiquette est mauvaise (F ou G), proposer une solution globale
    if (['F', 'G'].includes(etiquette)) {
      suggestions.push({
        titre: "Rénovation globale",
        description: "Une rénovation complète de votre logement permettrait d'atteindre une étiquette énergétique B ou C et de réduire considérablement vos factures.",
        priorite: 1,
        duree: "1 à 3 mois",
        economie: "60% à 80% sur votre facture annuelle",
        cout: "400€ à 700€ par m²",
        impact: 'important',
        image: "" // À compléter
      });
    }

    // Trier les suggestions par priorité
    return suggestions.sort((a, b) => a.priorite - b.priorite);
  };

  // Fonction pour sélectionner ou désélectionner un travail
  const toggleTravail = (titre: string) => {
    if (travauxSelectionnes.includes(titre)) {
      setTravauxSelectionnes(travauxSelectionnes.filter(t => t !== titre));
    } else {
      setTravauxSelectionnes([...travauxSelectionnes, titre]);
    }
  };

  // Recalculer les bénéfices lorsque les travaux sélectionnés changent
  useEffect(() => {
    if (!resultat || travauxSelectionnes.length === 0) return;

    const resultatApres = simulerEtiquetteApres(resultat, data, travauxSelectionnes);
    const economiesFinancieres = calculerEconomiesFinancieres(resultat, resultatApres, data);
    const economiesCO2 = calculerEconomiesCO2(resultat, resultatApres, data);
    
    setBenefices({
      etiquetteAvant: resultat.etiquette,
      etiquetteApres: resultatApres.etiquette,
      economieEuros: economiesFinancieres.economie,
      economieKWh: Math.round((resultat.valeurEnergie - resultatApres.valeurEnergie) * parseFloat(data.surface || '100')),
      pourcentageEconomie: economiesFinancieres.pourcentage,
      economieGES: economiesCO2
    });
  }, [travauxSelectionnes, resultat, data]);
  
  // Fonction auxiliaire pour obtenir la couleur correspondant à l'étiquette DPE
  const getEtiquetteColor = (etiquette: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'): string => {
    const colors: Record<string, string> = {
      A: '#249143',
      B: '#6FB24F',
      C: '#CBCB00',
      D: '#EC9C00',
      E: '#E8601C',
      F: '#E63926',
      G: '#B31613'
    };
    return colors[etiquette] || colors.G;
  };

  // Fonction pour basculer entre les onglets
  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="etape-container">
        <div className="loading-message">
          <h2>Calcul en cours...</h2>
          <p>Nous analysons votre habitat pour générer un bilan personnalisé.</p>
          <div className="loader"></div>
        </div>
      </div>
    );
  }
  
  const renderPerformanceEnergetique = () => {
    if (!resultat) return null;
    
    return (
      <div className="performance-container">
        <h3>Performance énergétique et climatique :</h3>
        
        <div className="etiquette-dpe">
          <div className="etiquette-barre">
            <div className={`etiquette-lettre ${resultat.etiquette === 'A' ? 'active' : ''}`} style={{backgroundColor: '#51a351'}}>A</div>
            <div className={`etiquette-lettre ${resultat.etiquette === 'B' ? 'active' : ''}`} style={{backgroundColor: '#78ab46'}}>B</div>
            <div className={`etiquette-lettre ${resultat.etiquette === 'C' ? 'active' : ''}`} style={{backgroundColor: '#aecf3b'}}>C</div>
            <div className={`etiquette-lettre ${resultat.etiquette === 'D' ? 'active' : ''}`} style={{backgroundColor: '#ffd838'}}>D</div>
            <div className={`etiquette-lettre ${resultat.etiquette === 'E' ? 'active' : ''}`} style={{backgroundColor: '#f9b742'}}>E</div>
            <div className={`etiquette-lettre ${resultat.etiquette === 'F' ? 'active' : ''}`} style={{backgroundColor: '#ee6834'}}>F</div>
            <div className={`etiquette-lettre ${resultat.etiquette === 'G' ? 'active' : ''}`} style={{backgroundColor: '#e54c2d'}}>G</div>
          </div>
          <div className="etiquette-valeur">
            <span style={{fontWeight: 'bold'}}>CLASSE {resultat.etiquette}</span> - {resultat.valeurEnergie} kWh/m²/an
          </div>
        </div>
        
        <div className="etiquette-info">
          <h4>Mon bien est-il aux normes ?</h4>
          <ul>
            {resultat.etiquette === 'G' && <li>Interdit à la location (classé "indécent") depuis le 1er janvier 2023</li>}
            {resultat.etiquette === 'F' && <li>Gel des loyers depuis le 24 août 2022</li>}
            {['F', 'G'].includes(resultat.etiquette) && <li>Interdit à la location à partir du 1er janvier 2028</li>}
            {['E', 'F', 'G'].includes(resultat.etiquette) && <li>Obligation de réaliser un audit énergétique en cas de vente du logement</li>}
          </ul>
          
          <div className="info-collapse-btn" onClick={() => console.log("Comment calculé")}>
            <span>Comment est calculée cette note ?</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
  const renderDeperditions = () => {
    if (!resultat) return null;
    
    const { pertes } = resultat;
    
    return (
      <div className="deperditions-container">
        <h3>Analyse des déperditions :</h3>
        
        <div className="house-deperditions">
          <div className="house-image">
            <img src={MaisonDPImg} alt="Maison avec déperditions" />
          </div>
          
          <div className="dp-ventilation dp-item">
            <div className="dp-value">Ventilation<br/><span>{pertes.ventilation}%</span></div>
          </div>
          
          <div className="dp-toiture dp-item">
            <div className="dp-value">Toiture ou plafond<br/><span>{pertes.combles}%</span></div>
          </div>
          
          <div className="dp-murs dp-item">
            <div className="dp-value">Murs<br/><span>{pertes.murs}%</span></div>
          </div>
          
          <div className="dp-fenetres dp-item">
            <div className="dp-value">Portes et fenêtres<br/><span>{pertes.fenetres}%</span></div>
          </div>
          
          <div className="dp-plancher dp-item">
            <div className="dp-value">Plancher bas<br/><span>{pertes.plancher}%</span></div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderTravauxPreconises = () => {
    if (!travaux || travaux.length === 0) return null;
    
    return (
      <div className="travaux-container">
        <h3>Travaux préconisés :</h3>
        
        <p className="travaux-intro">Procéder à une rénovation globale est plus efficace et permet d'augmenter la performance de votre logement. Sélectionnez les travaux pour voir l'impact sur votre étiquette DPE.</p>
        
        <div className="travaux-grid">
          {travaux.map((travail, index) => (
            <div 
              key={index} 
              className={`travail-item ${travauxSelectionnes.includes(travail.titre) ? 'selected' : ''}`}
              onClick={() => toggleTravail(travail.titre)}
            >
              <div className="travail-icon">
                {index === 0 && <div className="priorite-tag">Poste de travaux prioritaire</div>}
                {travail.image ? <img src={travail.image} alt={travail.titre} /> : <div className="no-image">🏗️</div>}
              </div>
              <div className="travail-content">
                <h4 className="travail-titre">{travail.titre}</h4>
                <p className="travail-description">{travail.description}</p>
                <div className="travail-metrics">
                  <div className="travail-metric">
                    <span className="metric-label">Coût estimé:</span>
                    <span className="metric-value">{travail.cout}</span>
                  </div>
                  <div className="travail-metric">
                    <span className="metric-label">Économie:</span>
                    <span className="metric-value">{travail.economie}</span>
                  </div>
                </div>
                <div className="travail-tag">{index === 0 ? 'Isolation' : 'Systèmes'}</div>
                <div className="travail-selection-indicator">
                  {travauxSelectionnes.includes(travail.titre) ? '✓ Sélectionné' : 'Cliquez pour sélectionner'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="start-project-btn">Démarrer mon projet de rénovation</button>
      </div>
    );
  };
  
  const renderBenefices = () => {
    if (!benefices) return null;
    
    return (
      <div className="benefices-container">
        <h3>Bénéfices après travaux :</h3>
        
        <div className="benefices-grid">
          <div className="benefice-item energie">
            <h4>Économie d'énergie</h4>
            <div className="benefice-value">
              <span className="value-big">{benefices.economieKWh.toLocaleString('fr-FR')}</span>
              <span className="value-unit">kWh/an</span>
            </div>
            <div className="benefice-percentage">Soit {benefices.pourcentageEconomie}% d'économie</div>
          </div>
          
          <div className="benefice-item financier">
            <h4>Économie financière</h4>
            <div className="benefice-value">
              <span className="value-big">{benefices.economieEuros.toLocaleString('fr-FR')}</span>
              <span className="value-unit">€/an</span>
            </div>
            <div className="benefice-details">Basé sur les prix actuels de l'énergie</div>
          </div>
          
          <div className="benefice-item environnement">
            <h4>Impact environnemental</h4>
            <div className="benefice-value">
              <span className="value-big">{benefices.economieGES.kgCO2.toLocaleString('fr-FR')}</span>
              <span className="value-unit">kg CO₂/an</span>
            </div>
            <div className="benefice-details">
              Équivalent à {Math.round(benefices.economieGES.kmVoiture / 1000).toLocaleString('fr-FR')} 000 km en voiture
            </div>
          </div>
        </div>
        
        <div className="etiquette-comparison">
          <h4>Évolution de l'étiquette énergétique</h4>
          <div className="etiquettes-container">
            <div className="etiquette-avant">
              <h5>Avant travaux</h5>
              <div className="etiquette-badge" style={{backgroundColor: getEtiquetteColor(benefices.etiquetteAvant)}}>
                {benefices.etiquetteAvant}
              </div>
            </div>
            <div className="etiquette-arrow">→</div>
            <div className="etiquette-apres">
              <h5>Après travaux</h5>
              <div className="etiquette-badge etiquette-badge-animated" style={{backgroundColor: getEtiquetteColor(benefices.etiquetteApres)}}>
                {benefices.etiquetteApres}
              </div>
            </div>
          </div>
        </div>
        
        <div className="aides-financieres">
          <h4>Aides financières disponibles</h4>
          <ul>
            <li>MaPrimeRénov' : jusqu'à 90% du montant des travaux</li>
            <li>Certificats d'économies d'énergie (CEE)</li>
            <li>TVA à taux réduit (5,5%)</li>
            <li>Éco-prêt à taux zéro (Éco-PTZ)</li>
          </ul>
        </div>
      </div>
    );
  };

  // Page finale de simulation
  const renderSimulationComplete = () => {
    return (
      <div className="simulation-complete">
        <h1>Simulation terminée !</h1>
        
        <div className="cta-banner">
          <p>Si vous le souhaitez, vous pouvez dès maintenant prendre rendez-vous avec un conseiller pour vous accompagner dans votre projet.</p>
          <button className="cta-button">Prendre rendez-vous avec un conseiller</button>
        </div>
        
        <div className="tabs-container">
          <div 
            className={`tab-item ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            Performance énergétique
          </div>
          <div 
            className={`tab-item ${activeTab === 'deperditions' ? 'active' : ''}`}
            onClick={() => setActiveTab('deperditions')}
          >
            Déperditions
          </div>
          <div 
            className={`tab-item ${activeTab === 'travaux' ? 'active' : ''}`}
            onClick={() => setActiveTab('travaux')}
          >
            Travaux
          </div>
          <div 
            className={`tab-item ${activeTab === 'benefices' ? 'active' : ''}`}
            onClick={() => setActiveTab('benefices')}
          >
            Bénéfices
          </div>
        </div>
        
        <div className="tab-content">
          {activeTab === 'performance' && renderPerformanceEnergetique()}
          {activeTab === 'deperditions' && renderDeperditions()}
          {activeTab === 'travaux' && renderTravauxPreconises()}
          {activeTab === 'benefices' && renderBenefices()}
        </div>
        
        <div className="contact-expert">
          <button className="expert-button">Prendre rendez-vous avec un expert</button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="etape-container etape-resume">
      {renderSimulationComplete()}
    </div>
  );
};

export default Etape8_Resume; 