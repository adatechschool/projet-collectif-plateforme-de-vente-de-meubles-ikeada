import Layout from './routes/Layout'
import CardList from './routes/CardList'
import ProductPage from './routes/ProductPage.jsx'
import BackOffice from './routes/BackOffice.jsx'
import Login from './routes/Login'
import ProtectedRoute from './auth/ProtectedRoute'
import { Routes, Route } from "react-router-dom"
import ErrorPage from '/Users/margothuet/Documents/Ada/Projetco/projet-collectif-plateforme-de-vente-de-meubles-ikeada/Ikeada/src/routes/page404.jsx'

export default function App() {
  return (
    <Routes>
      {/* Route vers "l'interface", seule la navbar est chargée */}
      <Route path="/" element={<Layout />}>
        {/* Routes vers le contenu */}
        <Route path="accueil" element={<CardList />} />
        {/* Route dynamique vers un résultat de recherche, pour l'instant il faut le nom complet du produit */}
        <Route path="search/:query" element={<CardList />} />
        {/* Route dynamique vers chaque page produit selon l'id */}
        <Route path=":productId" element={<ProductPage />} />
        {/* route vers le back office avec un "tampon" protectedroute qui vérifie les données de session*/}
        <Route path="back-office"
          element={
            <ProtectedRoute>
              <BackOffice />
            </ProtectedRoute>}
        />
        {/* route vers la page de login */}
        <Route path="login" element={<Login />} />
        {/* Route qui renvoie vers une page d'erreur (pas fini) */}
        <Route path="/ErrorPage" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}