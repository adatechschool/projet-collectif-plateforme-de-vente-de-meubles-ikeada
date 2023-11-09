import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { itemsStore } from "../stores/itemStore";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Stack,
  Badge,
  Modal,
  Figure,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import MainTitle from "../components/atoms/MainTitle";
import { FileX } from "react-bootstrap-icons";
const ProductPage = observer(() => {
  // on récupère l'id depuis l'URL créée par le routeur
  const itemId = useParams().productId;
  // et l'item depuis le store
  const item = itemsStore.currentItem;
  // on vérifie juste si la page à changée (ça évite de boucler)
  useEffect(() => {
    if (itemId) {
      itemsStore.searchItemById(itemId);
    }
  }, [itemId]);
  // obligé d'utiliser useEffect pour ne pas appeler map avant que .materials n'existe et causer une erreur
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    if (item.materials) {
      setMaterials(
        item.materials.map((material) => {
          return (
            <ListGroup.Item pill bg="secondary" key={material}>
              {material}
            </ListGroup.Item>
          );
        })
      );
    }
  }, [item.materials]);
  const [colors, setColors] = useState([]);
  useEffect(() => {
    if (item.colors) {
      setColors(
        item.colors.map((color) => {
          return (
            <>
              <ListGroup.Item key={color} className="d-flex flex-row grow-0" >
                <p style={{ lineClamp: "1" }}>{color.name}</p>
                ></div>
              </ListGroup.Item>
            </>
          );
        })
      );
    }
  }, [item.colors]);
  const [dimensions, setDimensions] = useState([]);
  useEffect(() => {
    if (item.dimensions) {
      setDimensions(
        item.dimensions.map((dimension) => {
          return (
            <Badge pill bg="secondary" key={dimension}>
              {dimension}
            </Badge>
          );
        })
      );
    }
  }, [item.dimensions]);
  const [zoomImg, setZoomImg] = useState(false);
  const handleClose = () => setZoomImg(false);
  const handleShow = () => setZoomImg(true);
  // si on a pas d'image, on met le placeholder
  const picSrc =
    item.picture ||
    "https://www.arqueselectrodiesel.fr/wp-content/uploads/2022/08/photo-non-disponible-1.jpg";



  return (

    <Row style={{ padding: "32px 0" }}>
      <Col style={{ width: "40%", padding: "0 16px" }}>
        <Image fluid
          src={picSrc}
        />
      </Col>
      <Col className="d-flex flex-column justify-content-center">
        <Container className="text-center">
          <h3 >{item.name}</h3>
          <p>{item.desc}</p>
        </Container>
        <Container fluid className="d-flex flex-column justify-content-between">
          <Row>
            <Col>
              <h4>Matériaux</h4>
              <ListGroup>
                {materials}
              </ListGroup>
            </Col>
            <Col>
              <h4>Dimensions</h4>
              <ListGroup>
                {item.dimensions
                  ? item.dimensions.map((dimension, index) => (
                    <ListGroup.Item key={index}>
                      {`${dimension * 0.1} cm`}
                      {index < item.dimensions.length - 1 ? " x " : ""}
                    </ListGroup.Item>
                  ))
                  : "Aucune dimension disponible"}
              </ListGroup>
            </Col>
            <Col>
              <h4>Couleurs</h4>
              <ListGroup className='d-flex flex-column justify-content-center align-items-center'>
                {colors}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row >
  );
});

export default ProductPage;
{/*<>
        <Container
          className="d-flex flex-column justify-content-between align-items-center"
          style={{ minHeight: "90vh", width: "90vw" }}
          fluid
        >
         <Row>
          <Col>
            <Image
              src={picSrc}
              fluid
              style={{ width: "400px", marginBottom: "20px" }}
              thumbnail
              onClick={handleShow}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "25vw" }}>
            <h4>{item.name}</h4>
            <p>{item.desc}</p>

            {/* Afficher les matériaux du produit *

            <ListGroup>
              <ListGroup.Item className="d-flex flex-column justify-content-center align-items-center">
                Matériaux :
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="d-flex flex-row justify-content-center"
                >
                  {materials}
                </Stack>
              </ListGroup.Item>

              {/* Afficher la disponibilité du produit *

              <ListGroup.Item className="d-flex flex-column justify-content-center align-items-center">
                Disponibilité :
                {item.available ? (
                  <Badge pill bg="success">
                    En stock
                  </Badge>
                ) : (
                  <Badge pill bg="danger">
                    Épuisé
                  </Badge>
                )}
              </ListGroup.Item>

              {/* Afficher la dimension du produit conversion mm vers cm *
              <ListGroup.Item className="d-flex flex-row justify-content-evenly align-items-center">
                Dimensions :
                {item.dimensions
                  ? item.dimensions.map((dimension, index) => (
                    <span key={index}>
                      {`${dimension * 0.1} cm`}
                      {index < item.dimensions.length - 1 ? " x " : ""}
                    </span>
                  ))
                  : "Aucune dimension disponible"}
              </ListGroup.Item>

              {/* Afficher la couleur du produit */}
{/* <ListGroup.Item className='d-flex flex-column justify-content-center align-items-center'>
                Couleurs :
                <Stack direction="horizontal" gap={2} className="d-flex flex-row justify-content-center">
                  {item.colors.map((color) => (
                    <Badge pill style={bgColor} key={color.name}>{color.name}</Badge>
                  ))}
                </Stack>
              </ListGroup.Item> *
            </ListGroup>
          </Col>
          <Col
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ width: "25vw" }}
          >
            <h1>{item.price / 100}€</h1>
            <Button variant="primary" size="lg">
              Acheter
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={zoomImg} onHide={handleClose} animation={false} size="lg">
        <Modal.Body>
          <Image src={picSrc} fluid />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </> */}