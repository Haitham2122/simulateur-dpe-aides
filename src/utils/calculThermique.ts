import { FormData, EnergieChauffage } from '../types/types';

// Interface pour les résultats DPE
export interface ResultatDPE {
  etiquette: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  valeurEnergie: number; // kWh/m²/an
  valeurGES: number; // kgCO2/m²/an
  pertes: {
    combles: number; // pourcentage
    murs: number;
    fenetres: number;
    plancher: number;
    ventilation: number;
    pontsThermiques: number;
  };
  etatPostes: {
    combles: 'Bon' | 'Moyen' | 'Mauvais';
    murs: 'Bon' | 'Moyen' | 'Mauvais';
    sols: 'Bon' | 'Moyen' | 'Mauvais';
    fenetres: 'Bon' | 'Moyen' | 'Mauvais';
    chauffage: 'Bon' | 'Moyen' | 'Mauvais';
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

// Données DJU (degrés-jours unifiés) simplifiées par département
// Ces données devraient être idéalement importées d'un fichier CSV
const DJU_PAR_DEPARTEMENT: Record<string, {base17: number, base18: number, base19: number}> = {
  '75': {base17: 2387, base18: 2650, base19: 2922}, // Paris
  '69': {base17: 2325, base18: 2587, base19: 2857}, // Lyon
  '13': {base17: 1532, base18: 1783, base19: 2041}, // Marseille
  '33': {base17: 1934, base18: 2189, base19: 2452}, // Bordeaux
  '59': {base17: 2506, base18: 2779, base19: 3061}, // Lille
  '31': {base17: 1875, base18: 2129, base19: 2391}, // Toulouse
  '67': {base17: 2593, base18: 2867, base19: 3151}, // Strasbourg
  '44': {base17: 2161, base18: 2419, base19: 2685}, // Nantes
  '06': {base17: 1421, base18: 1670, base19: 1927}, // Nice
  '35': {base17: 2231, base18: 2490, base19: 2758}, // Rennes
  // On utilise une valeur par défaut si le département n'est pas trouvé
  'default': {base17: 2300, base18: 2600, base19: 2900}
};

// Fonction pour obtenir les DJU (degrés-jours unifiés) d'une localité
export const obtenirDJU = (codePostal: string, temperature: number = 18): number => {
  // Extraire le code département des deux premiers chiffres du code postal
  const codeDepartement = codePostal.substring(0, 2);
  
  // Récupérer les données DJU pour ce département
  const donneesDJU = DJU_PAR_DEPARTEMENT[codeDepartement] || DJU_PAR_DEPARTEMENT['default'];
  
  // Retourner la valeur DJU correspondant à la température de base
  if (temperature === 17) return donneesDJU.base17;
  if (temperature === 18) return donneesDJU.base18;
  if (temperature === 19) return donneesDJU.base19;
  
  // Si la température n'est pas exactement 17, 18 ou 19, on fait une interpolation linéaire
  if (temperature < 17) {
    // Extrapolation en dessous de 17°C
    return donneesDJU.base17 * (1 + (17 - temperature) * 0.1);
  } else if (temperature > 19) {
    // Extrapolation au-dessus de 19°C
    return donneesDJU.base19 * (1 - (temperature - 19) * 0.1);
  } else {
    // Interpolation entre 17 et 19°C
    const dju17 = donneesDJU.base17;
    const dju19 = donneesDJU.base19;
    return dju17 + (dju19 - dju17) * (temperature - 17) / 2;
  }
};

// Fonction pour calculer les coefficients thermiques (U-values) en fonction des caractéristiques du bâtiment
export const calculerCoefficientsThermiques = (data: FormData): CoefficientsThermiques => {
  const anneeConstruction = parseInt(data.anneeConstruction || '2000');
  const typeBien = data.typeBien || 'maison';
  
  // Valeurs par défaut - augmentées pour être plus sévères
  let uMurs = 1.5;     // W/m²K
  let uToiture = 1.2;  // W/m²K
  let uPlancher = 1.2; // W/m²K
  let uFenetres = 3.5; // W/m²K
  let uVentilation = 0.5; // W/m²K, dépend du système de ventilation
  let uPontsThermiques = 0.25; // W/m²K, valeur typique
  
  // Ajuster les coefficients en fonction de l'année de construction
  if (anneeConstruction < 1975) {
    // Bâtiments anciens sans réglementation thermique - valeurs augmentées
    uMurs = 3.0;
    uToiture = 2.5;
    uPlancher = 2.5;
    uFenetres = 5.0;
    uVentilation = 0.8;
    uPontsThermiques = 0.5;
  } else if (anneeConstruction < 1990) {
    // Première réglementation thermique
    uMurs = 1.8;
    uToiture = 1.4;
    uPlancher = 1.5;
    uFenetres = 3.8;
    uVentilation = 0.6;
    uPontsThermiques = 0.4;
  } else if (anneeConstruction < 2005) {
    // RT 1990-2000
    uMurs = 1.0;
    uToiture = 0.7;
    uPlancher = 0.9;
    uFenetres = 3.2;
    uVentilation = 0.45;
    uPontsThermiques = 0.3;
  } else if (anneeConstruction < 2012) {
    // RT 2005
    uMurs = 0.45;
    uToiture = 0.3;
    uPlancher = 0.4;
    uFenetres = 1.8;
    uVentilation = 0.3;
    uPontsThermiques = 0.2;
  } else {
    // RT 2012 et postérieur
    uMurs = 0.28;
    uToiture = 0.2;
    uPlancher = 0.25;
    uFenetres = 1.4;
    uVentilation = 0.2;
    uPontsThermiques = 0.1;
  }
  
  // Ajustements en fonction de l'état d'isolation déclaré
  if (data.isolationMurs === 'oui') uMurs *= 0.5;
  if (data.isolationMurs === 'non') uMurs *= 1.5;
  
  if (data.isolationCombles === 'oui') uToiture *= 0.5;
  if (data.isolationCombles === 'non') uToiture *= 1.5;
  
  if (data.isolationSol === 'oui') uPlancher *= 0.5;
  if (data.isolationSol === 'non') uPlancher *= 1.5;
  
  if (data.typeVitrage === 'simple') uFenetres = 5.0;
  if (data.typeVitrage === 'double') uFenetres = 2.5;
  if (data.typeVitrage === 'triple') uFenetres = 1.1;
  
  // Ajustements pour la ventilation
  if (data.ventilation === 'aucune') uVentilation = 0.8; // Augmenté pour être plus sévère
  if (data.ventilation === 'simple_flux') uVentilation = 0.4;
  if (data.ventilation === 'double_flux') uVentilation = 0.15;
  
  // Ajustements spécifiques au type de bien
  if (typeBien === 'appartement') {
    // Les appartements ont généralement moins de pertes par les murs
    if (data.emplacementAppartement === 'intermediaire') {
      uToiture = 0.1; // Peu de pertes par le toit pour un appartement intermédiaire
      uPlancher = 0.1; // Peu de pertes par le plancher pour un appartement intermédiaire
    } else if (data.emplacementAppartement === 'dernier_etage') {
      uToiture *= 1.2; // Plus de pertes par le toit pour un appartement en dernier étage
      uPlancher = 0.1; // Peu de pertes par le plancher
    } else if (data.emplacementAppartement === 'rez_de_chaussee') {
      uToiture = 0.1; // Peu de pertes par le toit
      uPlancher *= 1.2; // Plus de pertes par le plancher pour un appartement en RDC
    }
  }
  
  return {
    murs: uMurs,
    toiture: uToiture,
    plancher: uPlancher,
    fenetres: uFenetres,
    ventilation: uVentilation,
    pontsThermiques: uPontsThermiques
  };
};

// Fonction pour estimer les surfaces en fonction des données du bâtiment
export const estimerSurfaces = (data: FormData): SurfacesThermiques => {
  const surface = parseFloat(data.surface || '100'); // m²
  const typeBien = data.typeBien || 'maison';
  const formeBien = data.formeBien || 'carree';
  const hauteurSousPafond = data.hauteurSousPafond || 2.5; // hauteur standard en m
  
  let surfaceMurs = 0;
  let surfaceToiture = 0;
  let surfacePlancher = 0;
  let surfaceFenetres = 0;
  
  // Si les surfaces sont déjà spécifiées, les utiliser
  if (data.surfaceMurs) surfaceMurs = data.surfaceMurs;
  if (data.surfaceToiture) surfaceToiture = data.surfaceToiture;
  if (data.surfacePlancher) surfacePlancher = data.surfacePlancher;
  if (data.surfaceFenetres) surfaceFenetres = data.surfaceFenetres;
  
  // Sinon, estimer les surfaces
  if (surfaceMurs === 0 || surfaceToiture === 0 || surfacePlancher === 0 || surfaceFenetres === 0) {
    if (typeBien === 'maison') {
      // Estimer le périmètre
      let perimetre = 0;
      if (formeBien === 'carree') {
        // Pour une maison carrée, périmètre = 4 * sqrt(surface)
        perimetre = 4 * Math.sqrt(surface);
      } else if (formeBien === 'allongee') {
        // Pour une maison allongée, le rapport longueur/largeur est environ 1.5
        const largeur = Math.sqrt(surface / 1.5);
        const longueur = surface / largeur;
        perimetre = 2 * (longueur + largeur);
      } else {
        // Pour une forme irrégulière, on prend une approximation
        perimetre = 4.5 * Math.sqrt(surface);
      }
      
      // Calcul de la surface des murs (périmètre * hauteur)
      surfaceMurs = perimetre * hauteurSousPafond;
      
      // Ajustement pour la mitoyenneté
      if (data.mitoyennete === 'un_cote') {
        surfaceMurs *= 0.85; // Réduction de 15% pour un côté mitoyen
      } else if (data.mitoyennete === 'deux_cotes') {
        surfaceMurs *= 0.7; // Réduction de 30% pour deux côtés mitoyens
      }
      
      // Surface du toit et du plancher (approximativement égale à la surface habitable)
      surfaceToiture = surface * 1.1; // Légère majoration pour les débords de toit
      surfacePlancher = surface;
      
      // Surface des fenêtres (typiquement 15-20% de la surface habitable)
      surfaceFenetres = surface * 0.18;
    } else if (typeBien === 'appartement') {
      // Pour un appartement, la surface des murs extérieurs dépend de l'emplacement
      if (data.emplacementAppartement === 'intermediaire') {
        // Un appartement intermédiaire a moins de murs extérieurs
        // On estime environ 1 façade extérieure
        const facadeEstimee = Math.sqrt(surface) * hauteurSousPafond;
        surfaceMurs = facadeEstimee;
      } else {
        // Pour un appartement en RDC ou dernier étage, plus de murs extérieurs
        // On estime environ 2 façades extérieures
        const facadeEstimee = Math.sqrt(surface) * hauteurSousPafond * 2;
        surfaceMurs = facadeEstimee;
      }
      
      // Surface du toit et du plancher dépend de l'emplacement
      if (data.emplacementAppartement === 'dernier_etage') {
        surfaceToiture = surface;
        surfacePlancher = 0; // Pas de pertes par le plancher (vers un autre appartement chauffé)
      } else if (data.emplacementAppartement === 'rez_de_chaussee') {
        surfaceToiture = 0; // Pas de pertes par le toit (vers un autre appartement chauffé)
        surfacePlancher = surface;
      } else {
        // Appartement intermédiaire
        surfaceToiture = 0;
        surfacePlancher = 0;
      }
      
      // Surface des fenêtres (typiquement 15-20% de la surface habitable)
      surfaceFenetres = surface * 0.15;
    }
  }
  
  return {
    murs: surfaceMurs,
    toiture: surfaceToiture,
    plancher: surfacePlancher,
    fenetres: surfaceFenetres
  };
};

// Obtenir le rendement et le prix du kWh selon le type d'énergie
export const obtenirCoutChauffage = (energiePrincipale: EnergieChauffage | undefined): CoutChauffage => {
  let prixKWh = 0.15; // Prix moyen en €/kWh
  let rendement = 0.9; // Rendement moyen
  
  switch (energiePrincipale) {
    case 'electrique':
      prixKWh = 0.1841; // Prix moyen de l'électricité en €/kWh (2023)
      rendement = 0.98; // Rendement d'un chauffage électrique
      break;
    case 'gaz':
      prixKWh = 0.1031; // Prix moyen du gaz en €/kWh (2023)
      rendement = 0.80; // Rendement d'une chaudière gaz standard - diminué
      break;
    case 'fioul':
      prixKWh = 0.12; // Prix moyen du fioul en €/kWh (2023)
      rendement = 0.65; // Rendement d'une chaudière fioul ancienne - diminué
      break;
    case 'bois':
      prixKWh = 0.058; // Prix moyen du bois en €/kWh (2023)
      rendement = 0.65; // Rendement d'un chauffage bois - diminué
      break;
    case 'pac':
      prixKWh = 0.1841; // Prix moyen de l'électricité en €/kWh (2023)
      rendement = 2.7; // COP moyen d'une pompe à chaleur - augmenté
      break;
    default:
      // Valeurs par défaut
      break;
  }
  
  return { prixKWh, rendement };
};

// Calculer le facteur d'émissions de GES selon le type d'énergie
export const calculerFacteurEmissionGES = (energiePrincipale: EnergieChauffage | undefined): number => {
  switch (energiePrincipale) {
    case 'electrique':
      return 0.064; // kgCO2e/kWh pour l'électricité en France (mix électrique)
    case 'gaz':
      return 0.227; // kgCO2e/kWh pour le gaz naturel
    case 'fioul':
      return 0.324; // kgCO2e/kWh pour le fioul domestique
    case 'bois':
      return 0.03; // kgCO2e/kWh pour le bois (considéré comme faiblement émetteur)
    case 'pac':
      return 0.064 / 2.7; // kgCO2e/kWh pour une PAC (électricité / COP moyen)
    default:
      return 0.18; // Valeur moyenne par défaut
  }
};

// Fonction principale pour calculer le DPE avec la méthode des U-values et DJU
export const calculerDPE = (data: FormData): ResultatDPE => {
  // 1. Récupérer les DJU pour le code postal
  const codePostal = data.codePostal || '75000'; // Paris par défaut
  const temperatureConsigne = 19; // Température de consigne standard en France
  const djuLocalite = obtenirDJU(codePostal, temperatureConsigne);
  
  // 2. Calculer les coefficients thermiques (U-values)
  const coefficients = calculerCoefficientsThermiques(data);
  
  // 3. Estimer les surfaces
  const surfaces = estimerSurfaces(data);
  
  // 4. Calculer les déperditions thermiques
  // Formule: Déperdition = U × Surface × DJU × 24 / 1000 (en kWh)
  const deperditionMurs = coefficients.murs * surfaces.murs * djuLocalite * 24 / 1000;
  const deperditionToiture = coefficients.toiture * surfaces.toiture * djuLocalite * 24 / 1000;
  const deperditionPlancher = coefficients.plancher * surfaces.plancher * djuLocalite * 24 / 1000;
  const deperditionFenetres = coefficients.fenetres * surfaces.fenetres * djuLocalite * 24 / 1000;
  
  // Calcul des déperditions par ventilation
  // Surface habitable
  const surfaceHabitable = parseFloat(data.surface || '100');
  // Volume chauffé (m³)
  const volume = surfaceHabitable * (data.hauteurSousPafond || 2.5);
  // Déperdition par ventilation (taux de renouvellement d'air × volume × DJU × 0.34 / 1000)
  const tauxRenouvellementAir = data.ventilation === 'double_flux' ? 0.3 : 
                              data.ventilation === 'simple_flux' ? 0.6 : 1.0; // Augmenté pour absence de ventilation
  const deperditionVentilation = tauxRenouvellementAir * volume * djuLocalite * 0.34 / 1000;
  
  // Déperdition par ponts thermiques (approximation: % des déperditions totales)
  const deperditionPontsThermiques = (deperditionMurs + deperditionToiture + deperditionPlancher + deperditionFenetres) * 0.15; // Augmenté
  
  // 5. Déperdition totale
  const deperditionTotale = deperditionMurs + deperditionToiture + deperditionPlancher + 
                          deperditionFenetres + deperditionVentilation + deperditionPontsThermiques;
  
  // 6. Calculer la consommation énergétique
  // En tenant compte du rendement du système de chauffage
  const { rendement } = obtenirCoutChauffage(data.energiePrincipale);
  const consommationChauffage = deperditionTotale / rendement;
  
  // 7. Ajouter la consommation d'eau chaude sanitaire (ECS)
  // Estimation standard: 800 kWh par personne et par an
  const nombrePersonnes = Math.ceil(surfaceHabitable / 25); // Estimation du nombre d'occupants - augmenté
  const consommationECS = nombrePersonnes * 1000; // Augmenté pour être plus sévère
  
  // 8. Consommation totale en kWh
  const consommationTotale = consommationChauffage + consommationECS;
  
  // 9. Consommation par m² (en kWh/m²/an)
  const consommationParM2 = Math.round(consommationTotale / surfaceHabitable);
  
  // 10. Déterminer l'étiquette énergétique selon le barème officiel
  let etiquette: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  if (consommationParM2 <= 70) etiquette = 'A';
  else if (consommationParM2 <= 110) etiquette = 'B';
  else if (consommationParM2 <= 180) etiquette = 'C';
  else if (consommationParM2 <= 250) etiquette = 'D';
  else if (consommationParM2 <= 330) etiquette = 'E';
  else if (consommationParM2 <= 420) etiquette = 'F';
  else etiquette = 'G';
  
  // 11. Calculer les émissions de GES
  const facteurEmission = calculerFacteurEmissionGES(data.energiePrincipale);
  const emissionsGES = Math.round(consommationParM2 * facteurEmission);
  
  // 12. Calculer les pourcentages de déperdition par poste
  const deperditionTotalePoste = deperditionMurs + deperditionToiture + deperditionPlancher + 
                              deperditionFenetres + deperditionVentilation + deperditionPontsThermiques;
  
  const pourcentageMurs = Math.round((deperditionMurs / deperditionTotalePoste) * 100);
  const pourcentageToiture = Math.round((deperditionToiture / deperditionTotalePoste) * 100);
  const pourcentagePlancher = Math.round((deperditionPlancher / deperditionTotalePoste) * 100);
  const pourcentageFenetres = Math.round((deperditionFenetres / deperditionTotalePoste) * 100);
  const pourcentageVentilation = Math.round((deperditionVentilation / deperditionTotalePoste) * 100);
  const pourcentagePontsThermiques = Math.round((deperditionPontsThermiques / deperditionTotalePoste) * 100);
  
  // 13. Déterminer l'état des postes
  const evaluerEtat = (coefficient: number, typeCritere: string): 'Bon' | 'Moyen' | 'Mauvais' => {
    if (typeCritere === 'murs') {
      if (coefficient < 0.4) return 'Bon';
      if (coefficient < 1.0) return 'Moyen';
      return 'Mauvais';
    } else if (typeCritere === 'toiture' || typeCritere === 'plancher') {
      if (coefficient < 0.25) return 'Bon';
      if (coefficient < 0.8) return 'Moyen';
      return 'Mauvais';
    } else if (typeCritere === 'fenetres') {
      if (coefficient < 1.8) return 'Bon';
      if (coefficient < 3.0) return 'Moyen';
      return 'Mauvais';
    }
    return 'Moyen'; // Par défaut
  };
  
  // État du chauffage basé sur le type d'énergie et le rendement
  const evaluerEtatChauffage = (energie: EnergieChauffage | undefined): 'Bon' | 'Moyen' | 'Mauvais' => {
    if (energie === 'pac') return 'Bon';
    if (energie === 'bois' && data.typeChauffageBois === 'chaudiere') return 'Bon';
    if (energie === 'gaz' && data.typeChaudiereGaz === 'condensation') return 'Bon';
    if (energie === 'fioul') return 'Mauvais';
    if (energie === 'electrique') return 'Moyen';
    return 'Moyen'; // Par défaut
  };
  
  // Construire et retourner le résultat
  return {
    etiquette,
    valeurEnergie: consommationParM2,
    valeurGES: emissionsGES,
    pertes: {
      combles: pourcentageToiture,
      murs: pourcentageMurs,
      fenetres: pourcentageFenetres,
      plancher: pourcentagePlancher,
      ventilation: pourcentageVentilation,
      pontsThermiques: pourcentagePontsThermiques
    },
    etatPostes: {
      combles: evaluerEtat(coefficients.toiture, 'toiture'),
      murs: evaluerEtat(coefficients.murs, 'murs'),
      sols: evaluerEtat(coefficients.plancher, 'plancher'),
      fenetres: evaluerEtat(coefficients.fenetres, 'fenetres'),
      chauffage: evaluerEtatChauffage(data.energiePrincipale)
    }
  };
};

// Simuler les résultats après travaux avec les valeurs réglementaires
export const simulerEtiquetteApres = (
  resultatInitial: ResultatDPE, 
  data: FormData,
  travauxSelectionnes: string[]
): ResultatDPE => {
  // Copier les données initiales
  const dataMise = { ...data };
  
  // Appliquer les travaux sélectionnés avec les valeurs de la réglementation
  travauxSelectionnes.forEach(travail => {
    if (travail.includes("Isolation du toit") || travail.includes("isolation combles") || travail.includes("Isolation des combles")) {
      dataMise.isolationCombles = 'oui';
      // Valeur U réglementaire RT 2020 pour les combles
      dataMise.surfaceToiture = data.surfaceToiture; // Conserver la surface
    }
    
    if (travail.includes("Isolation des murs") || travail.includes("isolation murs")) {
      dataMise.isolationMurs = 'oui';
      // Valeur U réglementaire RT 2020 pour les murs
      dataMise.surfaceMurs = data.surfaceMurs; // Conserver la surface
    }
    
    if (travail.includes("Isolation du plancher") || travail.includes("isolation sol")) {
      dataMise.isolationSol = 'oui';
      // Valeur U réglementaire RT 2020 pour le plancher
      dataMise.surfacePlancher = data.surfacePlancher; // Conserver la surface
    }
    
    if (travail.includes("Remplacement des fenêtres")) {
      dataMise.typeVitrage = 'double';
      // Valeur U réglementaire RT 2020 pour les fenêtres
      dataMise.surfaceFenetres = data.surfaceFenetres; // Conserver la surface
    }
    
    if (travail.includes("pompe à chaleur") || travail.includes("PAC")) {
      dataMise.energiePrincipale = 'pac';
    }
    
    if (travail.includes("VMC double flux") || travail.includes("Installation d'une VMC")) {
      dataMise.ventilation = 'double_flux';
    }
  });
  
  // Recalculer le DPE avec les nouvelles données
  return calculerDPE(dataMise);
};

// Fonction pour calculer les économies financières après travaux
export const calculerEconomiesFinancieres = (
  resultatInitial: ResultatDPE,
  resultatApres: ResultatDPE,
  data: FormData
): { economie: number; pourcentage: number } => {
  const surface = parseFloat(data.surface || '100');
  
  // Calculer la consommation annuelle en kWh
  const consommationInitiale = resultatInitial.valeurEnergie * surface;
  const consommationApres = resultatApres.valeurEnergie * surface;
  
  // Calculer l'économie en kWh
  const economieKWh = consommationInitiale - consommationApres;
  
  // Calculer le pourcentage d'économie
  const pourcentage = Math.round((economieKWh / consommationInitiale) * 100);
  
  // Convertir en euros selon le type d'énergie
  const { prixKWh } = obtenirCoutChauffage(data.energiePrincipale);
  const economieEuros = Math.round(economieKWh * prixKWh);
  
  return {
    economie: economieEuros,
    pourcentage
  };
};

// Fonction pour calculer les économies d'émissions de CO2
export const calculerEconomiesCO2 = (
  resultatInitial: ResultatDPE,
  resultatApres: ResultatDPE,
  data: FormData
): { kgCO2: number; kmVoiture: number } => {
  const surface = parseFloat(data.surface || '100');
  
  // Calculer les émissions annuelles en kgCO2
  const emissionsInitiales = resultatInitial.valeurGES * surface;
  const emissionsApres = resultatApres.valeurGES * surface;
  
  // Calculer l'économie en kgCO2
  const economieKgCO2 = Math.round(emissionsInitiales - emissionsApres);
  
  // Convertir en équivalent km en voiture (250g CO2/km en moyenne)
  const kmVoiture = Math.round(economieKgCO2 / 0.25);
  
  return {
    kgCO2: economieKgCO2,
    kmVoiture
  };
}; 