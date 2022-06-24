import React from 'react'
import UsersTable from '../../components/UsersTable';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {FaPlusSquare} from "react-icons/fa";

const Users  = () => {
  return (
    <>
      <h2>Users</h2>
      <p className='fst-italic'>dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak</p>
      <Link to="add" ><Button variant="success" >Create new user <FaPlusSquare fill='#fff' size={'1.5rem'}/></Button></Link>
      <UsersTable />
    </>

  )
}


export default Users;