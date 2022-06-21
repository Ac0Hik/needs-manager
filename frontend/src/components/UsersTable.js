import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const UsersTable = () => {
  const [users, setUsers] = useState([])
  let { authTokens, logoutUser } = useContext(AuthContext)



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
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    }
  ,[authTokens.access, logoutUser])

  let deleteUser = async(e, id)=>{
    e.preventDefault();
    let response = await fetch(`${process.env.REACT_APP_URL}/api/users/delete/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }

    })
    if(response.status === 200){
      alert('user has been deleted successfully')
    }else{
      alert('suer could not be deleted')
    }

  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (

    <>

    <Table striped bordered hover size="sm" className='mt-2'>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>role</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                {user.is_staff 
                    ? <td>admin</td> 
                    : user.profiles.is_manager ? <td>manager</td> : <td>professor</td>}

                <td>
                  <form onSubmit={e=>deleteUser(e, user.id)}>
                    <Link  to={`update/${user.id}`}><Button variant="primary" className='mx-2'>edit</Button></Link>
                    <input type="submit" value="delete" className='btn btn-danger ' />
                  </form>
                </td>
              </tr>
            )
          })}

        </tbody>
      </Table>
    </>
  )
}

export default UsersTable;