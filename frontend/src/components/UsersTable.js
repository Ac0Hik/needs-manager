import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaEdit, FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { BeatLoader } from 'react-spinners'


const UsersTable = () => {
  const [users, setUsers] = useState([])
  let { authTokens, logoutUser } = useContext(AuthContext)
  let [isloading, setLoading] = useState(true)




  let loadUsers = useCallback(async () => {

    let response = await fetch(`${process.env.REACT_APP_URL}/api/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    }, [])

    let data = await response.json()

    if (response.status === 200) {
      setUsers(data)
      setLoading(false)

    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }
    , [authTokens.access, logoutUser])

  let deleteUser = async (e, id) => {
    e.preventDefault();
    let response = await fetch(`${process.env.REACT_APP_URL}/api/users/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }

    })
    if (response.status === 200) {
      alert('user has been deleted successfully')
    } else {
      alert('suer could not be deleted')
    }

  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (

    <>
      {isloading ?
        <BeatLoader color={'#060b26'} loading={isloading} size={150} />
        :

        <Table striped bordered hover size="sm" className='mt-2'>
          <thead>
            <tr>
              <th className='px-3'>Username</th>
              <th className='px-3'>First Name</th>
              <th className='px-3'>Last Name</th>
              <th className='px-3'>Email</th>
              <th className='px-3'>Role</th>
              <th className='px-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td className='px-3'>{user.username}</td>
                  <td className='px-3'>{user.first_name}</td>
                  <td className='px-3'>{user.last_name}</td>
                  <td className='px-3'>{user.email}</td>
                  {user.is_staff
                    ? <td className='px-3'>Admin</td>
                    : user.profiles.is_manager ? <td className='px-3'>Manager</td> : <td className='px-3'>Professor</td>}

                  <td>
                    <form onSubmit={e => deleteUser(e, user.id)} className="d-flex justify-content-around">
                      <Link to={`profile/${user.id}`}><FaRegEye fill='#E5DC16' size={'1.5rem'} /></Link>
                      <Link to={`update/${user.id}`}><FaEdit variant="warning" size={'1.5rem'} /></Link>
                      <Button type='submit' variant='danger'> <FaRegTrashAlt /></Button>

                    </form>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </Table>}
    </>
  )
}

export default UsersTable;