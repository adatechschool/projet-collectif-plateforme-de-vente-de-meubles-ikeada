import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ProductPage({ data }) {
    const picSrc =
    data.picture ||
    "https://www.arqueselectrodiesel.fr/wp-content/uploads/2022/08/photo-non-disponible-1.jpg";

    const cardImgStyle = {
        objectFit: "cover", 
        height: "200px", 
        width: "100%", 
        borderRadius: 0
      };

    return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
        <Card.Header>Prix : {data.price / 100} €</Card.Header>
        <Card.Img variant="top" src={picSrc} style={cardImgStyle} />
        <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
            {data.desc}
        </Card.Text>
        <Button className="button">Voir plus</Button>
      </Card.Body>
    </Card>
  );
}

