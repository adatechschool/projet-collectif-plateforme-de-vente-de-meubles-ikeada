import Card from 'react-bootstrap'
import Button from 'react-bootstrap'
import 'react'
import useLoaderData from 'react-router-dom'

export default function ProductPage() {
    const { products } = useLoaderData();


    return (
        <>
            <ul>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{products[0].name}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </ul>
        </>)
}