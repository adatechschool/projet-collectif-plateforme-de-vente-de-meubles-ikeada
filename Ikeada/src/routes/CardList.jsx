import { useState, useEffect } from 'react'
import ProductPage from './ProductPage.jsx'
import ProductCard from './ProductCard.jsx'

export default function CardList() {

    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        fetch('../../public/jsonTest/item.json')
            .then(response => response.json())
            .then(data => setJsonData(data))
            .catch(error => console.error('Erreur de chargement du JSON :', error));
    }, []);
    
    return (
        <div className="d-flex justify-content-around flex-wrap">
          {jsonData && 
            jsonData.map((product) => 
            <ProductCard key={product.id} data={product} />
            )
          }
        </div>
      )  
}
