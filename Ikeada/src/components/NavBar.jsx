import { Container, Navbar, Nav, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";

import { HouseDoorFill, PersonFill } from 'react-bootstrap-icons';

export function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Ikeada</Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          {/* <Button variant="outline-success">Search</Button> /// A remettre selon le besoin */}
        </Form>
        <Nav>
          <Link to={`/accueil`}><HouseDoorFill size={25} /></Link>
          <Link to={`/back-office`}><PersonFill size={25} /></Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar
