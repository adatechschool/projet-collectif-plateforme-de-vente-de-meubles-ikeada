import { Container } from "react-bootstrap"
import { Outlet } from "react-router"
import NavBar from "./components/NavBar"
export default function Layout() {
    return (
        <>
            <NavBar />
            <Container fluid>
                <Outlet />
            </Container>
        </>
    )
}
