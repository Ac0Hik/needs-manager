import React, { useState, useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link,NavLink } from 'react-router-dom';
import { UserSidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import {Dropdown} from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

const UserNavbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const {logoutUser} = useContext(AuthContext)
    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar d-flex justify-content-between align-items-baseline'>
            <div className='d-flex'>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
  
              <h2 className='mt-2 mx-2'><span className='text-warning'>Needs</span><span className='text-white'>Manager</span></h2>
            </div>
            <Dropdown className='mx-3 px-3'>
              <Dropdown.Toggle style={{backgroundColor:'#060b26', border:'none'}} id="dropdown-basic">
              <FaIcons.FaUserTie size='1.5rem'/>
              </Dropdown.Toggle>
  
              <Dropdown.Menu style={{backgroundColor:'#060b26'}}>
                <Dropdown.Item><Link to="profile" style={{ textDecoration: 'none' }}><span className='text-white'>Profile</span></Link></Dropdown.Item>
                <Dropdown.Item ><Link to="" onClick={logoutUser} style={{ textDecoration: 'none' }}><span className='text-white'>Logout</span></Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {UserSidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <NavLink to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
export default UserNavbar;