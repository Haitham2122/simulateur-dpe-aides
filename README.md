# Simulateur de Bilan Énergétique

Application web permettant de réaliser un bilan énergétique progressif et interactif. L'application est structurée en étapes qui apparaissent dynamiquement à mesure que l'utilisateur complète les informations demandées.

## Fonctionnalités

- Interface progressive qui révèle les étapes au fur et à mesure
- Réactivité immédiate aux choix de l'utilisateur
- Possibilité de modifier les sélections précédentes
- Validation des entrées à chaque étape
- Génération d'un bilan énergétique avec recommandations personnalisées
- Interface responsive et design moderne
- Fonctionnalité d'impression du bilan final

## Technologies utilisées

- React (avec TypeScript)
- CSS moderne (Flexbox, Grid, variables CSS)
- Responsive design

## Installation et démarrage

1. Assurez-vous d'avoir Node.js installé (version 14+ recommandée)
2. Clonez ce dépôt
3. Installez les dépendances :
   ```
   npm install
   ```
4. Démarrez l'application en mode développement :
   ```
   npm start
   ```
5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Structure du projet

- `src/components/` - Composants React de l'application
   - `SimulateurBilan.tsx` - Composant principal gérant le flux des étapes
   - `Etape1_TypeBien.tsx`, etc. - Composants pour chaque étape du formulaire
   - `ResultatBilan.tsx` - Affichage des résultats du bilan
   - `icons/` - Icônes SVG utilisées dans l'interface
- `src/types/` - Définitions de types TypeScript
- `src/hooks/` - Custom React Hooks
- `src/assets/` - Ressources statiques (images, etc.)

## Comment ça marche

Le simulateur est conçu selon le principe de "progressive disclosure" :

1. L'utilisateur commence par sélectionner le type de bien (maison ou appartement)
2. Une fois ce choix effectué, l'étape suivante apparaît automatiquement
3. À chaque étape complétée, le simulateur affiche un résumé de l'information et permet de revenir en arrière pour modifier
4. Le simulateur collecte progressivement toutes les informations nécessaires au bilan
5. À la fin du parcours, un bilan énergétique est généré avec des recommandations personnalisées

## Personnalisation

Vous pouvez personnaliser facilement :

- Les étapes du simulateur en ajoutant/modifiant les composants dans `src/components/`
- L'algorithme de calcul énergétique dans `ResultatBilan.tsx`
- L'apparence visuelle en modifiant les fichiers CSS correspondants

## Licence

Ce projet est sous licence MIT. 