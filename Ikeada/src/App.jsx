import { useState, useEffect } from 'react'
import NavBar from './NavBar'
import './App.css'

import ProductPage from './components/ProductPage'
import { Stack } from 'react-bootstrap';


function ItemCards() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetch('./jsonTest/item.json')
      .then(response => response.json())
      .then(data => setJsonData(data))
      .catch(error => console.error('Erreur de chargement du JSON :', error));
  }, []);

  console.log(jsonData)

  return (
    <>
      {jsonData && 
      <>
      <Stack direction="vertical" gap={3}>
          {jsonData.item.map((product) => (
            <ProductPage data={product} />
          ))}
        </Stack></>}
    </>
  )
}

export default ItemCards
