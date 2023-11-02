import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'
import ProductPage from './ProductPage.jsx'

import { Stack } from 'react-bootstrap';



export default function CardList() {

    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        fetch('../../public/jsonTest/item.json')
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
