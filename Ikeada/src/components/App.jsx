import Layout from '../Layout'
import CardList from './CardList'
import ProductPage from './ProductPage.jsx'
import BackOffice from './BackOffice.jsx'
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="accueil" element={<CardList />}>
          </Route>
          <Route path="product-page" element={<ProductPage />}>
          </Route>
          <Route path="back-office" element={<BackOffice />}>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}
