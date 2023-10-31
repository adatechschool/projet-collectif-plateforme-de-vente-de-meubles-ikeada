import { Container, NavItem, Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";

export function App() {
  return (
    <>
      <Container fluid>
        <Navbar>
          <Nav>
            <NavItem>
              <Link to={`/accueil`}>Accueil</Link>
            </NavItem>
            <NavItem>
              <Link to={`/back-office`}>Admin</Link>
            </NavItem>
          </Nav>
        </Navbar>
      </Container>
    </>
  )
}

export default App
