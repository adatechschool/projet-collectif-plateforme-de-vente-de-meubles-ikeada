import Layout from './routes/Layout'
import CardList from './routes/CardList'
import ProductPage from './routes/ProductPage.jsx'
import BackOffice from './routes/BackOffice.jsx'
import Login from './routes/Login'
import { Routes, Route } from "react-router-dom";
import {  } from './auth/ProtectedRoute'
export default function App() {
  return (
    <div>
      <Routes>
        {/* Route vers "l'interface", seule la navbar est chargée */}
        <Route path="/" element={<Layout />}>
          {/* Routes vers le contenu */}
          <Route path="accueil" element={<CardList />}>
          </Route>
          {/* Route dynamique vers chaque page produit selon l'id */}
          <Route
            path=":productId"
            element={<ProductPage />}
          >
          </Route>

          <Route path="back-office" element={
            <BackOffice />
          }>
          </Route>
          <Route path="login" element={<Login />}>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}
