import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function ProductPage() {
    return (
        <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>test</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card content.
                </Card.Text>
                <Link to="/product-page"><Button variant="primary" >Go somewhere</Button></Link>
            </Card.Body>
        </Card>
    )
}