import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Stack,
  Badge,
} from "react-bootstrap";

export default function ProductPage({ data }) {
  const [currentProduct, setCurrentProduct] = useState(2);
  const dataProduct = data[currentProduct];

  const picSrc =
    dataProduct.picture ||
    "https://www.arqueselectrodiesel.fr/wp-content/uploads/2022/08/photo-non-disponible-1.jpg";

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "90vh", width: "90vw" }}
      fluid
    >
      <Row>
        <Col>
          <Image
            src={picSrc}
            fluid
            style={{ width: "400px", marginBottom: "10px" }}
            thumbnail
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ width: "25vw" }}>
          <h4>{dataProduct.name}</h4>
          <p>{dataProduct.desc}</p>
          <ListGroup>
            <ListGroup.Item className="d-flex flex-column justify-content-center align-items-center">
              Matériaux :
              <Stack
                direction="horizontal"
                gap={2}
                className="d-flex flex-row justify-content-center"
              >
                {dataProduct.materials.map((material) => (
                  <Badge pill bg="secondary">
                    {material}
                  </Badge>
                ))}
              </Stack>
            </ListGroup.Item>
            {/* <ListGroup.Item className='d-flex flex-column justify-content-center align-items-center'>
          Couleurs :
          <Stack direction="horizontal" gap={2} className="d-flex flex-row justify-content-center">
            {dataProduct.colors.map((color) => (
              <Badge pill bg="secondary">{color}</Badge>
            ))}
          </Stack>
        </ListGroup.Item> */}
          </ListGroup>
        </Col>
        <Col className="d-flex flex-column align-items-center justify-content-center" style={{ width: "25vw" }}>
          <h1>{dataProduct.price / 100}€</h1>
          <Button variant="primary" size="lg">
            Acheter
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
