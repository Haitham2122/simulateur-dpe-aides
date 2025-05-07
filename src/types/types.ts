import React from 'react';

export type TypeBien = 'maison' | 'appartement' | null;
export type FormeBien = 'carree' | 'allongee' | 'autre' | null;
export type Mitoyennete = 'non' | 'un_cote' | 'deux_cotes' | null;
export type Etages = 'plain_pied' | 'un_etage' | 'plus_etages' | null;

// Types pour l'isolation
export type EtatIsolation = 'oui' | 'non' | 'je_ne_sais_pas' | null;
export type TypeVitrage = 'simple' | 'double' | 'triple' | null;

// Types pour le chauffage
export type EnergieChauffage = 'electrique' | 'gaz' | 'fioul' | 'bois' | 'pac' | null;
export type TypeChaudiereGaz = 'standard' | 'basse_temperature' | 'condensation' | null;
export type TypeChauffageBois = 'insert' | 'poele_buches' | 'poele_granules' | 'chaudiere' | null;
export type TypePAC = 'air_air' | 'air_eau' | 'eau_eau' | 'geothermique' | null;

// Types pour la climatisation et ventilation
export type EtatClimatisation = 'oui' | 'non' | null;
export type TypeVentilation = 'aucune' | 'simple_flux' | 'double_flux' | null;

// Types pour les informations utilisateur
export type Civilite = 'monsieur' | 'madame' | null;

export interface EtapeProps {
  onComplete: (data: any) => void;
  onReturn?: () => void;
  data?: any;
}

export interface FormData {
  typeBien: TypeBien;
  codePostal?: string;
  anneeConstruction?: string;
  formeBien?: FormeBien;
  mitoyennete?: Mitoyennete;
  etages?: Etages;
  surface?: string;
  // Appartement spécifique
  emplacementAppartement?: 'rez_de_chaussee' | 'intermediaire' | 'dernier_etage' | null;
  typeAppartement?: 'simple' | 'duplex' | 'triplex' | null;
  nombreFacades?: number;
  // Isolation
  isolationCombles?: EtatIsolation;
  isolationSol?: EtatIsolation;
  isolationMurs?: EtatIsolation;
  typeVitrage?: TypeVitrage;
  // Chauffage
  energiePrincipale?: EnergieChauffage;
  typeChaudiereGaz?: TypeChaudiereGaz;
  typeChauffageBois?: TypeChauffageBois;
  typePAC?: TypePAC;
  chauffageSecondaire?: boolean;
  energieSecondaire?: EnergieChauffage;
  // Climatisation et ventilation
  climatisation?: EtatClimatisation;
  ventilation?: TypeVentilation;
  // Informations utilisateur
  civilite?: Civilite;
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: string;
  newsletter?: boolean;
  acceptConditions?: boolean;
  // Propriétés pour le calcul thermique
  hauteurSousPafond?: number; // en mètres
  surfaceMurs?: number; // en m²
  surfaceToiture?: number; // en m²
  surfacePlancher?: number; // en m²
  surfaceFenetres?: number; // en m²
  region?: string; // région pour déterminer les DJU
  commune?: string; // commune pour les DJU plus précis
  // Add other data fields as needed
}

export interface EtapeCompletee {
  title: string;
  data: any;
  component: React.FC<EtapeProps>;
} 