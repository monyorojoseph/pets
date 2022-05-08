import React from 'react';
import { Container, Navbar} from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import Toasts from './Toasts';
import Verify from './Verify';


const Header = () => {

  return (
    <Navbar bg="light" expand="lg" sticky="top">
        <Toasts />
        <Container>
            <Navbar.Brand as={NavLink} className="fw-bold text-success" to="/">Get a Pet</Navbar.Brand>
            <Verify />
        </Container>
    </Navbar>
  )
}

export default Header