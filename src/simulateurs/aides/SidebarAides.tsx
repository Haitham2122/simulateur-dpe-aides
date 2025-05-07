import React from 'react';
import TibetLogo from '../../assets/images/TibetLogo.webp';

interface SidebarAidesProps {
  currentStep: number;
}

const SidebarAides: React.FC<SidebarAidesProps> = ({ currentStep }) => {
  // Les étapes principales du parcours pour le simulateur d'aides
  const steps = [
    { id: 0, label: "Votre statut", active: currentStep === 0 },
    { id: 1, label: "Votre logement", active: currentStep === 1 },
    { id: 2, label: "Votre situation", active: currentStep === 2 },
    { id: 3, label: "Performance énergétique", active: currentStep === 3 },
    { id: 4, label: "Projet de rénovation", active: currentStep === 4 },
    { id: 5, label: "Informations complémentaires", active: currentStep === 5 },
    { id: 6, label: "Vos aides", active: currentStep >= 6 }
  ];

  return (
    <aside className="App-sidebar">
      <div className="App-logo">
        <img src={TibetLogo} alt="Tibet Logo" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
      
      <h2>Votre parcours</h2>
      
      <ul className="sidebar-menu">
        {steps.map((step) => (
          <li key={step.id}>
            <div className={`sidebar-menu-item ${step.active ? 'active' : ''}`}>
              {step.label}
            </div>
          </li>
        ))}
      </ul>
      
      <div className="disclaimer">
        * Ce simulateur vous permet d'estimer les aides financières auxquelles vous pourriez être éligible pour vos travaux de rénovation énergétique. Les montants sont donnés à titre indicatif et ne constituent pas un engagement.
      </div>
    </aside>
  );
};

export default SidebarAides; 