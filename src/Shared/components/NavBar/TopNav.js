import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const TopNav = props =>{

    return(<div>
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Half-Homemade</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link href="#login">Login</Nav.Link>
                    <Nav.Link href="#Cart">Cart</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>)
}

export default TopNav;