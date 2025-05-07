import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Accueil from './components/Accueil';
import { SimulateurBilan, Sidebar } from './components';
import { SimulateurAides } from './simulateurs/aides';
import SidebarAides from './simulateurs/aides/SidebarAides';

function App() {
  const [currentStepDPE, setCurrentStepDPE] = useState<number>(0);
  const [currentStepAides, setCurrentStepAides] = useState<number>(0);

  // Gérer le changement d'étape pour DPE
  const handleStepChangeDPE = (step: number) => {
    setCurrentStepDPE(step);
  };

  // Gérer le changement d'étape pour Aides
  const handleStepChangeAides = (step: number) => {
    setCurrentStepAides(step);
  };

  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/dpe" element={
            <>
              <Sidebar currentStep={currentStepDPE} />
              <main className="App-main">
                <SimulateurBilan onStepChange={handleStepChangeDPE} />
              </main>
            </>
          } />
          <Route path="/aides" element={
            <>
              <SidebarAides currentStep={currentStepAides} />
      <main className="App-main">
                <SimulateurAides onStepChange={handleStepChangeAides} />
      </main>
            </>
          } />
        </Routes>
    </div>
    </Router>
  );
}

export default App; 