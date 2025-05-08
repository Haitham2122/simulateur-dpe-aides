// Liste partielle des communes françaises avec leurs codes INSEE
// Format: { code: string, nom: string }

// Interface pour les communes françaises avec leurs codes INSEE
export interface Commune {
  code: string;
  nom: string;
}

// État initial vide
let communesData: Commune[] = [];

// Fonction pour charger les communes depuis le CSV
export const chargerCommunes = async (): Promise<void> => {
  try {
    // Chemin vers le fichier CSV dans le dossier public
    const response = await fetch('/assets/v_commune_2025.csv');
    
    if (!response.ok) {
      throw new Error(`Erreur lors du chargement du fichier CSV: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    // Parser le CSV
    const lines = csvText.split('\n');
    const communes: Commune[] = [];
    
    // Format du CSV v_commune_2025: COM;12345;27;NOM DE COMMUNE
    // Ignorer la première ligne si c'est un en-tête
    const startIndex = lines[0].startsWith('TYPECOM') ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Séparer les champs en utilisant le point-virgule comme séparateur
      const fields = line.split(';');
      
      if (fields.length >= 4) {
        communes.push({
          code: fields[1].trim(), // Code INSEE est dans la 2ème colonne
          nom: fields[3].trim()   // Nom de la commune est dans la 4ème colonne
        });
      }
    }
    
    communesData = communes;
    console.log(`Chargement réussi de ${communes.length} communes`);
    
  } catch (error) {
    console.error('Erreur lors du chargement des communes:', error);
    // En cas d'erreur, utiliser quelques communes par défaut
    communesData = [
      { code: "75056", nom: "Paris" },
      { code: "13055", nom: "Marseille" },
      { code: "69123", nom: "Lyon" },
      { code: "44109", nom: "Nantes" },
      // Ajouter quelques autres grandes villes...
    ];
  }
};

// Charger les communes au démarrage
chargerCommunes();

// Fonction pour obtenir toutes les communes
export const getCommunes = (): Commune[] => {
  return communesData;
};

// Fonction pour filtrer les communes par nom ou code
export const filtrerCommunes = (recherche: string): Commune[] => {
  if (!recherche || recherche.length < 2) return [];

  recherche = recherche.toLowerCase().trim();
  
  return communesData
    .filter(commune => 
      commune.nom.toLowerCase().includes(recherche) ||
      commune.code.includes(recherche)
    )
    .slice(0, 10); // Limiter les résultats à 10 communes
}; 