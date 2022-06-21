import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import {Navbar, Nav, Container} from 'react-bootstrap'




const AdminHeader = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return (
       <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark ">
              <Container>
                <Navbar.Brand>Admin interface</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={NavLink} to='/admin' exact >Home</Nav.Link>
                    <Nav.Link as={NavLink} to="profile">profile</Nav.Link>
                    <Nav.Link as={NavLink} to="users">users</Nav.Link>
                    <Nav.Link as={NavLink} to="requests">requests</Nav.Link>
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

export default AdminHeader;
