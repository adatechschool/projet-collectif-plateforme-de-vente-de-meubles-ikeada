# Documentation Front-end du Projet

## Introduction
La documentation front-end de ce projet vous guidera à travers les étapes nécessaires pour développer une application web en utilisant la stack technologique suivante : React avec Vite comme serveur de développement, Bootstrap pour les styles et React Router pour la navigation.

## Prérequis
Avant de commencer à travailler sur le projet, assurez-vous d'avoir installé Node.js sur votre machine. Vous pouvez le télécharger à partir du site officiel : Node.js.

## Installation
Installez les dépendances du projet en utilisant npm :

```bash
npm install
```

## Exécution de l'Application
Pour exécuter l'application, utilisez Vite, un serveur de développement rapide pour React. Vous pouvez lancer l'application avec la commande suivante :

```bash
npm run dev
```
L'application sera accessible à l'adresse http://localhost:3000 dans votre navigateur.

## Structure du Projet
La structure du projet est organisée comme suit :

```css
Ikeada/
  ├── src/
  │    ├── components/
  │    │    ├── BackOffice.jsx
  │    │    ├── CardList.jsx
  │    │    ├── Login.jsx
  │    │    ├── NavBar.jsx
  │    │    ├── ProductCard.jsx
  │    │    ├── ProductPage.jsx
  │    ├── App.jsx
  │    ├── Layout.jsx
  │    └── main.jsx
  └── index.html
```

Le dossier src contient tous les fichiers source de l'application, y compris les composants.
Le dossier components contient les composants réutilisables tels que le header et le footer.
Le fichier App.jsx est le composant principal de l'application où les routes sont configurées.

## Configuration de React Router
React Router est utilisé pour gérer la navigation au sein de l'application. Vous pouvez configurer de nouvelles routes dans le fichier App.js. Voici un exemple de configuration de route :

