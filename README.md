# Application de Recettes de Cuisine

## Description

Cette application permet aux utilisateurs de rechercher, ajouter et consulter des recettes de cuisine. Elle inclut également une fonctionnalité pour marquer les recettes comme favorites.

## Fonctionnalités

1. **Recherche de Recettes** :
   - Barre de recherche avec suggestions automatiques.
   - Recherche en temps réel dans une base de données de recettes.
2. **Affichage des Recettes** :
   - **Liste des Recettes** :
     - Aperçu rapide des recettes (image, titre, temps de préparation).
     - Filtres par catégorie (ex : entrées, plats principaux, desserts) et type de cuisine (ex : italienne, asiatique).
   - **Détails de la Recette** :
     - Informations complètes : ingrédients, étapes de préparation, temps, portions...
3. **Ajout de Recettes** :
   - Formulaire de soumission avec validation en temps réel et gestion des erreurs.
4. **Favoris** :
   - Ajout et suppression des favoris avec stockage dans le local storage.
   - Page dédiée pour afficher les favoris.

## Architecture de l'Application

- **Composant App** : Gère la navigation et l'état global.
- **Composant Home** : Page d'accueil avec liste de recettes et filtres.
- **Composant Recipe** : Page détail d'une recette.
- **Composant FormModal** : Modale du formulaire d'ajout de recette.
- **Composant RecipeCard** : Composant card disponible sur la page d'accueil.

## Technologies Utilisées

- **Frontend** : React JS.
- **Navigation** : React Router.
- **Design** : HTML/CSS avec Flexbox/Grid.
- **Outils** : Visual Studio Code, Git/GitHub, Figma.

## Instructions d'Installation

- Clonez le dépôt :

```bash
git clone https://github.com/Feonark/ECF-FRONT-END
```

- Installez les dépendances :

```bash
npm i
```

```bash
npm i react-router
```

- Lancez l'application :

```bash
npm run dev
```

## Maquettes Figma

[Maquettes](https://www.figma.com/design/keMDInEZ4qz37cdyvLdQsT/ECF-Front-THIVEL?node-id=0-1&t=y2aXP0YuNrjVXhs9-1)
