import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { HouseDoorFill, PersonFill } from 'react-bootstrap-icons';

function NavBar() {
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
          <Nav.Link href="#action2"><PersonFill size={25} /></Nav.Link>
          <Nav.Link href="#action1"><HouseDoorFill size={25} /></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
