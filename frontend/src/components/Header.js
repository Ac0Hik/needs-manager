import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import {Navbar, Nav, Container} from 'react-bootstrap'


const Header = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark pills">
              <Container>
                <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                    <Nav.Link >profile</Nav.Link>
                  </Nav>
                  <Nav>
                  {user ?
                    (<Nav.Link onClick = {logoutUser}>Logout</Nav.Link>)
                    :(<Nav.Link><Link to="/login" >Login</Link></Nav.Link>)}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </>
    )
}

export default Header
