import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import ProductPage from './ProductPage'
import { Stack } from 'react-bootstrap';

export default function CardList() {
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
      fetch('../../public/jsonTest/item.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setJsonData(data);
          })
        .catch(error => console.error('Erreur de chargement du JSON :', error));
    }, []);
    
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