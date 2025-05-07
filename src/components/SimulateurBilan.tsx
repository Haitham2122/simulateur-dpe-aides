import React, { useState } from 'react';
import { FormData, EtapeCompletee, EtapeProps } from '../types/types';
import { Etape1_TypeBien } from './index';
import { Etape2_Localisation } from './index';
import { Etape3_FormeEtMitoyennete } from './index';
import { Etape4_Isolation } from './index';
import { Etape5_Chauffage } from './index';
import { Etape6_ClimVentilation } from './index';
import { Etape7_InfosUtilisateur } from './index';
import { Etape8_Resume } from './index';
import './SimulateurBilan.css';

interface StepDefinition {
  component: React.FC<EtapeProps>;
  title: string;
}

interface SimulateurBilanProps {
  onStepChange?: (step: number) => void;
}

const SimulateurBilan: React.FC<SimulateurBilanProps> = ({ onStepChange }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    typeBien: null,
  });
  const [completedSteps, setCompletedSteps] = useState<EtapeCompletee[]>([]);
  const [showCompletedSteps, setShowCompletedSteps] = useState<boolean>(false);

  // Handle step completion and move to next step
  const handleStepComplete = (data: any) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    
    // Ajouter l'étape actuelle aux étapes complétées
    if (currentStep < steps.length) {
      const currentStepData = steps[currentStep];
      const newCompletedStep: EtapeCompletee = {
        title: currentStepData.title,
        data: data,
        component: currentStepData.component
      };
      
      // Mettre à jour les étapes complétées
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[currentStep] = newCompletedStep;
      setCompletedSteps(newCompletedSteps);
    }
    
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    
    // Notifier le parent du changement d'étape
    if (onStepChange) {
      onStepChange(nextStep);
    }
  };

  // Return to a previous step
  const handleReturn = (index: number) => {
    setCurrentStep(index);
    // Remove completed steps after the one we're returning to
    setCompletedSteps(completedSteps.slice(0, index));
    
    // Notifier le parent du changement d'étape
    if (onStepChange) {
      onStepChange(index);
    }
  };

  // Go back to the previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      
      // Notifier le parent du changement d'étape
      if (onStepChange) {
        onStepChange(prevStep);
      }
    }
  };

  // Toggle showing/hiding completed steps
  const toggleCompletedSteps = () => {
    setShowCompletedSteps(!showCompletedSteps);
  };

  // Components for each step
  const steps: StepDefinition[] = [
    {
      component: Etape1_TypeBien,
      title: "Type de bien",
    },
    {
      component: Etape2_Localisation,
      title: "Localisation et année",
    },
    {
      component: Etape3_FormeEtMitoyennete,
      title: "Forme et mitoyenneté",
    },
    {
      component: Etape4_Isolation,
      title: "Isolation",
    },
    {
      component: Etape5_Chauffage,
      title: "Chauffage",
    },
    {
      component: Etape6_ClimVentilation,
      title: "Climatisation et ventilation",
    },
    {
      component: Etape7_InfosUtilisateur,
      title: "Vos informations",
    },
    {
      component: Etape8_Resume,
      title: "Bilan énergétique",
    }
  ];

  // Determine which component to render based on current step
  const renderCurrentStep = () => {
    if (currentStep >= steps.length) {
      return null;
    }
    
    const StepComponent = steps[currentStep].component;
    return (
      <StepComponent 
        onComplete={handleStepComplete} 
        onReturn={handlePrevious}
        data={formData}
      />
    );
  };

  // Render completed steps
  const renderCompletedSteps = () => {
    return completedSteps.map((step, index) => (
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
        <div className="step-content">
          {renderStepSummary(step.data, index)}
        </div>
      </div>
    ));
  };

  // Render a summary of the step's data
  const renderStepSummary = (data: any, stepIndex: number) => {
    switch (stepIndex) {
      case 0: // Type de bien
        return <p>{data.typeBien === 'maison' ? 'Maison' : 'Appartement'}</p>;
      case 1: // Localisation et année
        return (
          <>
            <p>Code postal: {data.codePostal}</p>
            <p>Année de construction: {data.anneeConstruction}</p>
          </>
        );
      case 2: // Forme et mitoyenneté
        return (
          <>
            <p>Forme: {data.formeBien}</p>
            <p>Mitoyenneté: {data.mitoyennete}</p>
            <p>Étages: {data.etages}</p>
            {data.surface && <p>Surface: {data.surface} m²</p>}
          </>
        );
      case 3: // Isolation
        return (
          <>
            <p>Isolation combles: {data.isolationCombles}</p>
            <p>Isolation sol: {data.isolationSol}</p>
            <p>Isolation murs: {data.isolationMurs}</p>
            <p>Type de vitrage: {data.typeVitrage}</p>
          </>
        );
      case 4: // Chauffage
        return (
          <>
            <p>Énergie principale: {data.energiePrincipale}</p>
            {data.typeChaudiereGaz && <p>Type de chaudière: {data.typeChaudiereGaz}</p>}
            {data.typeChauffageBois && <p>Type de chauffage bois: {data.typeChauffageBois}</p>}
            {data.typePAC && <p>Type de PAC: {data.typePAC}</p>}
            <p>Chauffage secondaire: {data.chauffageSecondaire ? 'Oui' : 'Non'}</p>
            {data.energieSecondaire && <p>Énergie secondaire: {data.energieSecondaire}</p>}
          </>
        );
      case 5: // Climatisation et ventilation
        return (
          <>
            <p>Climatisation: {data.climatisation === 'oui' ? 'Oui' : 'Non'}</p>
            {data.ventilation && <p>Ventilation: {
              data.ventilation === 'aucune' ? 'Pas de VMC' :
              data.ventilation === 'simple_flux' ? 'VMC simple flux' :
              'VMC double flux'
            }</p>}
          </>
        );
      case 6: // Informations utilisateur
        return (
          <>
            <p>{data.civilite === 'monsieur' ? 'M.' : 'Mme'} {data.prenom} {data.nom}</p>
            <p>Email: {data.email}</p>
            {data.telephone && <p>Téléphone: {data.telephone}</p>}
          </>
        );
      case 7: // Bilan énergétique
        return (
          <>
            {data.resultat && (
              <p>Étiquette énergétique: {data.resultat.etiquette} - {data.resultat.valeurEnergie} kWh/m².an</p>
            )}
            {data.travaux && data.travaux.length > 0 && (
              <p>{data.travaux.length} suggestions de travaux</p>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="simulateur-bilan">
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} 
        />
      </div>
      
      {/* Header avec informations et bouton pour montrer/cacher les étapes complétées */}
      <div className="simulateur-header">
        <h2>{steps[currentStep]?.title || "Résultats"}</h2>
        
        {completedSteps.length > 0 && (
          <button 
            className="toggle-steps-button" 
            onClick={toggleCompletedSteps}
          >
            {showCompletedSteps ? 'Masquer les étapes précédentes' : 'Voir les étapes précédentes'}
          </button>
        )}
      </div>
      
      {/* Bouton précédent */}
      {currentStep > 0 && (
        <button className="precedent-button" onClick={handlePrevious}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Précédent
        </button>
      )}
      
      {/* Completed steps - only shown when toggled */}
      {showCompletedSteps && completedSteps.length > 0 && (
        <div className="completed-steps-container">
          {renderCompletedSteps()}
        </div>
      )}
      
      {/* Current step */}
      <div className="current-step-container">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default SimulateurBilan; 