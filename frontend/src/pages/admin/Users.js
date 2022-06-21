import React from 'react'
import UsersTable from '../../components/UsersTable';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Users  = () => {
  return (
    <>
      <h3>Users</h3>
      <p className='fst-italic'>dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak</p>
      <Link to="add" ><Button variant="success" >create new user</Button></Link>
      <UsersTable />
    </>

  )
}


export default Users;