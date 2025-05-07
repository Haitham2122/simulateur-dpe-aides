import React from 'react';
import { EtapeProps, FormData } from '../types/types';
import './ResultatBilan.css';

interface RatingResult {
  class: string;
  score: number;
  color: string;
}

const ResultatBilan: React.FC<EtapeProps> = ({ data }) => {
  const formData = data as FormData;
  
  // Simulate energy rating calculation
  const calculateEnergyRating = (): RatingResult => {
    // This is a simplified simulation
    // In a real application, this would use the collected data for a complex calculation
    const baseScore = formData.typeBien === 'maison' ? 120 : 90; // Houses typically use more energy than apartments
    const constructionYear = parseInt(formData.anneeConstruction || '2000', 10);
    
    // Adjust score based on construction year
    let yearAdjustment = 0;
    if (constructionYear < 1950) yearAdjustment = 70;
    else if (constructionYear < 1975) yearAdjustment = 50;
    else if (constructionYear < 2000) yearAdjustment = 30;
    else if (constructionYear < 2010) yearAdjustment = 10;
    
    const totalScore = baseScore + yearAdjustment;
    
    // Determine energy class based on total score (kWh/m²/year)
    if (totalScore <= 50) return { class: 'A', score: totalScore, color: '#319834' };
    if (totalScore <= 90) return { class: 'B', score: totalScore, color: '#5EB033' };
    if (totalScore <= 150) return { class: 'C', score: totalScore, color: '#CCDB2A' };
    if (totalScore <= 230) return { class: 'D', score: totalScore, color: '#F9CD1D' };
    if (totalScore <= 330) return { class: 'E', score: totalScore, color: '#F08023' };
    if (totalScore <= 450) return { class: 'F', score: totalScore, color: '#E3572D' };
    return { class: 'G', score: totalScore, color: '#D22B2C' };
  };
  
  // Simulate CO2 emission rating calculation
  const calculateCO2Rating = (): RatingResult => {
    // Simplified CO2 rating calculation
    const energyRating = calculateEnergyRating();
    const co2Factor = 0.1; // Simplified factor
    const co2Score = Math.round(energyRating.score * co2Factor);
    
    // Determine CO2 class based on score (kg CO2/m²/year)
    if (co2Score <= 5) return { class: 'A', score: co2Score, color: '#319834' };
    if (co2Score <= 10) return { class: 'B', score: co2Score, color: '#5EB033' };
    if (co2Score <= 20) return { class: 'C', score: co2Score, color: '#CCDB2A' };
    if (co2Score <= 35) return { class: 'D', score: co2Score, color: '#F9CD1D' };
    if (co2Score <= 55) return { class: 'E', score: co2Score, color: '#F08023' };
    if (co2Score <= 80) return { class: 'F', score: co2Score, color: '#E3572D' };
    return { class: 'G', score: co2Score, color: '#D22B2C' };
  };
  
  // Generate recommendations based on energy rating
  const generateRecommendations = (): string[] => {
    const energyRating = calculateEnergyRating();
    const recommendations: string[] = [];
    
    // Add recommendations based on energy class
    if (['E', 'F', 'G'].includes(energyRating.class)) {
      recommendations.push('Isolation des murs extérieurs');
      recommendations.push('Remplacement des fenêtres simple vitrage par du double vitrage');
      recommendations.push('Installation d\'une ventilation mécanique contrôlée (VMC)');
    }
    
    if (['D', 'E', 'F', 'G'].includes(energyRating.class)) {
      recommendations.push('Remplacement du système de chauffage');
    }
    
    if (['C', 'D', 'E', 'F', 'G'].includes(energyRating.class)) {
      recommendations.push('Isolation de la toiture');
    }
    
    // Always recommend these
    recommendations.push('Installation de panneaux solaires');
    recommendations.push('Utilisation d\'un thermostat programmable');
    
    return recommendations;
  };
  
  const energyRating = calculateEnergyRating();
  const co2Rating = calculateCO2Rating();
  const recommendations = generateRecommendations();
  
  return (
    <div className="resultat-container">
      <h2>Résultat de votre bilan énergétique</h2>
      
      <div className="summary">
        <p>
          Votre {formData.typeBien === 'maison' ? 'maison' : 'appartement'} située au code postal {formData.codePostal}, 
          construite en {formData.anneeConstruction}, a les caractéristiques énergétiques suivantes :
        </p>
      </div>
      
      <div className="ratings-container">
        <div className="rating-box">
          <h3>Consommation Énergétique</h3>
          <div className="energy-scale">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(ratingClass => (
              <div 
                key={ratingClass}
                className={`rating-bar ${ratingClass === energyRating.class ? 'active' : ''}`}
                style={{ 
                  backgroundColor: ratingClass === energyRating.class ? energyRating.color : 'auto'
                }}
              >
                <span className="rating-letter">{ratingClass}</span>
                {ratingClass === energyRating.class && (
                  <span className="rating-value">{energyRating.score} kWh/m²/an</span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="rating-box">
          <h3>Émissions de Gaz à Effet de Serre</h3>
          <div className="energy-scale">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(ratingClass => (
              <div 
                key={ratingClass}
                className={`rating-bar ${ratingClass === co2Rating.class ? 'active' : ''}`}
                style={{ 
                  backgroundColor: ratingClass === co2Rating.class ? co2Rating.color : 'auto'
                }}
              >
                <span className="rating-letter">{ratingClass}</span>
                {ratingClass === co2Rating.class && (
                  <span className="rating-value">{co2Rating.score} kg CO₂/m²/an</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="recommendations">
        <h3>Recommandations pour améliorer votre performance énergétique</h3>
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </div>
      
      <div className="disclaimer-box">
        <p>
          <strong>Note :</strong> Ce bilan énergétique est une estimation simplifiée basée sur les informations que vous avez fournies. 
          Pour un diagnostic de performance énergétique (DPE) officiel, veuillez contacter un professionnel certifié.
        </p>
      </div>
      
      <div className="step-buttons">
        <button 
          type="button" 
          className="next-button"
          onClick={() => window.print()}
        >
          Imprimer le bilan
        </button>
      </div>
    </div>
  );
};

export default ResultatBilan;