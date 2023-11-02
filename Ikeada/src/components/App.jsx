import Layout from '../Layout'
import CardList from './CardList'
import ProductPage from './ProductPage.jsx'
import BackOffice from './BackOffice.jsx'
import Login from './Login'
import { Routes, Route } from "react-router-dom";


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
            path="/:productId"
            element={<ProductPage />}
            loader={({ params }) => {
            }}
            action={({ params }) => { }}>
          </Route>
          <Route path="back-office" element={<BackOffice />}>
          </Route>
          <Route path="login" element={<Login />}>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}
