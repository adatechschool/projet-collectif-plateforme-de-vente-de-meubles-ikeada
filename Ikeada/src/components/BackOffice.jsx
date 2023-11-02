import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import BackOfficeItem from "./BackOfficeItem.jsx"

export default function BackOffice() {
    const [jsonData, setJsonData] = useState(null);



    useEffect(() => {
        fetch('../../public/jsonTest/item.json')
            .then(response => response.json())
            .then(data => setJsonData(data))
            .catch(error => console.error('Erreur de chargement du JSON :', error));
    }, []);

 

    return (
        <>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <row><h1>Panneau d'administration</h1></row>
            <row><Table bordered striped>
                <thead >
                    <tr >
                        <th className="bg-secondary text-white fs-4">Produit</th>
                        <th className="bg-secondary text-white fs-4 text-center">Prix</th>
                        <th className="bg-secondary text-white fs-4 text-center">Statut</th>
                        <th className="bg-secondary text-white fs-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jsonData &&
                        <>

                            {jsonData.item.map((product) => (
                                <BackOfficeItem name={product.name}
                                    status={product.status}
                                    available={product.available}
                                    price={product.price}
                                    key={product.id} />
                            ))}
                        </>}
                </tbody>
            </Table></row>
        </>
    )
}