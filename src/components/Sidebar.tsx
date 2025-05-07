import React from 'react';
import TibetLogo from '../assets/images/TibetLogo.webp';

interface SidebarProps {
  currentStep: number;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep }) => {
  // Les étapes principales du parcours
  const steps = [
    { id: 0, label: "Votre logement", active: currentStep <= 2 },
    { id: 3, label: "Votre isolation", active: currentStep === 3 },
    { id: 4, label: "Votre chauffage", active: currentStep === 4 },
    { id: 5, label: "Votre climatisation", active: currentStep === 5 },
    { id: 6, label: "Vos informations", active: currentStep === 6 },
    { id: 7, label: "Votre bilan", active: currentStep === 7 }
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
        * Ce formulaire vous permet d'estimer l'étiquette énergie de votre logement, en simulant sa consommation énergétique et ses émissions de gaz à effet de serre. Ce bilan n'a pas de valeur juridique, et ne peut se substituer à un DPE réalisé par un professionnel agréé.
      </div>
    </aside>
  );
};

export default Sidebar; 