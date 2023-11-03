import { Container } from "react-bootstrap"
import { Outlet } from "react-router"

import NavBar from "../components/NavBar"

// éléments permanents qui ne sont pas modifiés pendant la navigation
export default function Layout() {
    return (
        <>
            <NavBar />
            <Container fluid>
                {/* c'est ici que les pages sont injectées lors de la navigation */}
                <Outlet />
            </Container>
        </>
    )
}


