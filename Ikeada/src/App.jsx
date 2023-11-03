import Layout from './routes/Layout'
import CardList from './routes/CardList'
import ProductPage from './routes/ProductPage.jsx'
import BackOffice from './routes/BackOffice.jsx'
import Login from './routes/Login'
import ProtectedRoute from './auth/ProtectedRoute'
import { Routes, Route } from "react-router-dom";
import { sessionStore } from './auth/session.js'
import { Provider } from "mobx-react";
//future route privée qui sécurisera le back office


export default function App() {
  return (
    <Provider sessionStore={sessionStore}>
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
            {/* route vers le back office */}

            <Route path="back-office" element={
              <ProtectedRoute>
                <BackOffice />
              </ProtectedRoute>
            }>
            </Route>
            {/* route vers la page de login */}
            <Route path="login" element={<Login />}>
            </Route>
          </Route>
        </Routes>
      </div>
    </Provider>
  )
}
