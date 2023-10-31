import React from 'react';
import { Container, Row, Col, Image, ListGroup, Button, Stack, Badge } from 'react-bootstrap';

export default function ProductPage({ data }) {
  return (
    <Container>
      <Row>
        <Col>
          <Image src={data.picture} fluid />
        </Col>
        <Col className="d-flex flex-column justify-content-center">
          <h4>{data.name}</h4>
          <p>{data.desc}</p>
          <ListGroup>
            <ListGroup.Item>
              Matériaux :
              <Stack direction="horizontal" gap={2} className="d-flex flex-row justify-content-center">
                {data.materials.map((material) => (
                  <Badge pill bg="secondary">{material}</Badge>
                ))}
              </Stack>
            </ListGroup.Item>
            <ListGroup.Item>
              Couleurs :
              <Stack direction="horizontal" gap={2} className="d-flex flex-row justify-content-center">
                {data.colors.map((color) => (
                  <Badge pill bg="secondary">{color}</Badge>
                ))}
              </Stack>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <h1>{data.price / 100}€</h1>
          <Button variant="primary" size="lg">
            Acheter
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
