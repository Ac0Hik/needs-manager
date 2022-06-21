import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import { Link, NavLink } from 'react-router-dom'
import {Navbar, Nav, Container} from 'react-bootstrap'

const ManagerHeader = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return (
       <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark ">
              <Container>
                <Navbar.Brand>Manager interface</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={NavLink} to='/manager' exact >Home</Nav.Link>
                    <Nav.Link as={NavLink} to="profile">profile</Nav.Link>
                    <Nav.Link as={NavLink} to="categories">categories</Nav.Link>
                    <Nav.Link as={NavLink} to="articles">articles</Nav.Link>
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

export default ManagerHeader;