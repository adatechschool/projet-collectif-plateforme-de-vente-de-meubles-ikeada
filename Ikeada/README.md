# Dependances

- Vite -> React, Javascript ES6
- React-Bootstrap
- Bootstrap
- Prop-Types

# Routing

La navigation entre les différentes pages est gérée par un HASH ROUTER appelé aux niveau de main.js (point d'entrée de l'application pour Node.js) et configuré au niveau de App.jsx (point d'entrée pour React) grâce à des <Routes> et des sous-routes (children).

Le routeur permet de créer des chemins associés à un URL et de charger les fichiers .jsx correspondants lors de la navigation :

- pour "/" (la racine), on charge la barre de navigation <NavBar>. Elle ne sera pas rechargée quand on change de page.

-  quand l'utilisateur navigue vers une page, le routeur regarde quel fichier correspond à la sous-route ("/accueil" => <CardList />, "/product-page" => <ProductPage/>) et injecte le code dans un div grâce à l'élément <Outlet/> qui sert de point d'injection.

Cela permet de donner l'impression de naviguer d'une page à l'autre, avec des url différentes, alors qu'en réalité on charge des composants.
