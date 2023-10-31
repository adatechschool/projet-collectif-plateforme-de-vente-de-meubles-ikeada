import './App.css'
import Container, { NavItem, Navbar, Nav } from 'react-bootstrap'
import { Outlet, Link } from "react-router-dom";
import { getProducts } from "/products";

export async function loader() {
  const products = await getProducts();
  return { products };
}

function App() {
  return (
    <>
      <Container fluid>
        <Navbar>
          <Nav>
            <NavItem>
              <Link to={`CardList`}>Accueil</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <Container fluid id="Content">
          <Outlet />
        </Container>
      </Container>
    </>
  )
}

export default App
