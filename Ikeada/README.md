## Dependances

- Vite : outil de déploiement/transpilateur/gestion du serveur de dev
- React, Javascript ES6
- React-Bootstrap -> version de bootstrap adaptée à React, on importe directement dans chaque composant
- Prop-Types : outil de verification de type des props, c'est pas aussi efficace que TypeScript mais c'est beaucoup plus simple à mettre en place
- Mob X : outil de gestion des States et de création de Stores (on explique en détail plus bas)

## Routing

La navigation entre les différentes pages est gérée par un HASH ROUTER appelé aux niveau de main.js (point d'entrée de l'application pour Node.js) et configuré au niveau de App.jsx (point d'entrée pour React) grâce à des <Routes> et des sous-routes (children).

Le routeur permet de créer des chemins associés à un URL et de charger les fichiers .jsx correspondants lors de la navigation :

- pour "/" (la racine), on charge la barre de navigation <NavBar>. Elle ne sera pas rechargée quand on change de page.

-  quand l'utilisateur navigue vers une page, le routeur regarde quel fichier correspond à la sous-route ("/accueil" => <CardList />, "/product-page" => <ProductPage/>) et injecte le code dans un div grâce à l'élément <Outlet/> qui sert de point d'injection.

Cela permet de donner l'impression de naviguer d'une page à l'autre, avec des url différentes, alors qu'en réalité on charge des composants.

### Routes protégées

Le routeur permet de contrôler l'accès à certaines routes. Ici on s'en est servi pour protéger l'accès au back-office :

On a créé un composant <ProtectedRoute /> qui vérifie si l'utilisateur est connecté et redirige vers <BackOffice /> seulement si c'est le cas.

## States & Stores

Le state, c'est les données du front-end de l'application, en temps réel. Ca peux être par exemple un champ de formulaire (qu'est ce que l'utilisateur est en train de taper), une liste de résultats de recherche à afficher, l'état d'une barre d'outil (minimisée/étendue)...

C'est cool, mais dans React, le state est lié aux composants. Pour avoir des States plus global qui permettent de garder et actualiser par exemple des réponses de requêtes API, des données de session... C'est vite compliqué.

On utilise MobX qui simplifie tout ça :

On crée un Store sous la forme d'une classe, qui va contenir le State et donner des actions, c'est à dire des méthodes, pour faire des trucs sur ou avec le state. L'actualiser, faire des calculs, filtrer des données, récupérer des données spécifiques.

Ensuite, on peut y accèder depuis n'importe ou, ce qui est très pratique, par exemple pour gérer l'accès à une route privée

> regardez session.js dans src/auth/, c'est notre Store pour les données de session après la connexion avec Supabase, ça nous sert notament à autoriser l'accès au back-office