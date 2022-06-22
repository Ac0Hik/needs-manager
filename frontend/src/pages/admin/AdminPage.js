import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const AdminPage = () => {
  const [requests, setRequests] = useState([])
  let { authTokens } = useContext(AuthContext)

  const getRequests = async () => {
    let response = await fetch(`${process.env.REACT_APP_URL}/api/requests/unhandled`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    }, [])

    let data = await response.json()

    if (response.status === 200) {
      setRequests(data)
      //console.log(requests[0].basket.items);
    } else {
      console.log('requests could not be loaded')
    }

  }

  useEffect(() => {
    getRequests()

  }, [])
  return (


    <>
      <Table striped bordered hover size="sm" className='mt-2'>
        <thead>
          <tr>
            <th>#</th>
            <th>teacher id</th>
            <th>created at</th>
            <th>basket state</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            return (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.created_by_id}</td>
                <td>{request.created_at}</td>
                <td>{request.basket.basket_state}</td>  
                <td>
                  <form >
                    <Link  to={`requests/handle/${request.id}/${request.created_by_id}/`}><Button variant="primary" className='mx-2'>view</Button></Link>
                    <input type="submit" value="delete" className='btn btn-danger ' />
                  </form>
                </td>
              </tr>
            )
          })
          }

        </tbody>
      </Table>
    </>
  )

}

export default AdminPage;