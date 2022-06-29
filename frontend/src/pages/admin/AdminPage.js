import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';




const AdminPage = () => {
  const [requests, setRequests] = useState([])
  let { authTokens, user } = useContext(AuthContext)
  const [usernames, setUsernames] = useState([])

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
    } else {
      console.log('requests could not be loaded')
    }

  }
  const getUsernames = async () => {
    let response = await fetch(`${process.env.REACT_APP_URL}/api/users/idUsername`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    }, [])
    let data = await response.json()
    if (response.status === 200) {
      setUsernames(data)
    }
  }

  useEffect(() => {
    getUsernames();
    getRequests();

  }, [])
  return (


    <>
        <h1>Welcome Back {user.username}</h1>
        <h1>You have {!requests.length? 0 : requests.length} unhandled requests</h1>
        <Container>
            <Row xs={1} md={2} className="g-4">
          {requests.map((request) => (
            <Col>
              <Card className="px-5 pt-3" >
                <Card.Img  className="round img-fluid" style={{width:"150px", height:"150px"}} variant="top" src="https://icon-library.com/images/free-avatar-icon/free-avatar-icon-10.jpg" />
                <Card.Body>
                  <Card.Title>{request.created_at?.slice(0,10)}</Card.Title>
                <Card.Title >{usernames.find(user => user["id"] === request.created_by_id).username}</Card.Title>
                  <Card.Text className='fst-italic'>{request.basket.basket_state}</Card.Text>
                  <Card.Text>
                    This is an unhandled request by {usernames.find(user => user["id"] === request.created_by_id).username}.
                    Sent the {request.created_at?.slice(0,10)}
                  </Card.Text>
                  <Link  to={`requests/handle/${request.id}/${request.created_by_id}/`}><Button style={{backgroundColor:'#060b26'}} className='mx-2'>view</Button></Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </Container>
    </>
  )

}

export default AdminPage;