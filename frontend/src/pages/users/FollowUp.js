import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners'

const FollowUp = () => {
    const { authTokens, user } = useContext(AuthContext)
    let [requests, setRequests] = useState([])
    const [isloading, setIsLoading] = useState(true)
  
    const getRequests = async () => {
      let response = await fetch(`${process.env.REACT_APP_URL}/api/requests/userRequests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      }, [])
  
      let data = await response.json()
  
      if (response.status === 200) {
        setRequests(data)
        setIsLoading(false)
      } else {
        console.log('requests could not be loaded')
      }
  
    }
  
    useEffect(() => {
      getRequests();
    }, [])
  
    return (
      <>{isloading ?
        <BeatLoader color={'#060b26'} loading={isloading} size={150} />
        :
        <>
          <h1>Follow up</h1>
           <Button className='mb-4' style={{backgroundColor: '#060b26'}}><Link style={{ textDecoration: 'none', color: '#fff' }} to='/requests/add'>New Request?</Link></Button>
          <Container>
            <Row xs={1} md={2} className="g-4">
              {requests.map((request) => (
                <Col>
                  <Card className="px-5 pt-3"  border={ request.basket.basket_state === 'P' ? "success": request.basket.basket_state ==='BP'? 'secondary':"danger"}>
                    <Card.Img className="round img-fluid" style={{ width: "150px", height: "150px" }} variant="top" src="https://icon-library.com/images/free-avatar-icon/free-avatar-icon-10.jpg" />
                    <Card.Body>
                      <Card.Title>{request.created_at?.slice(0, 10)}</Card.Title>
                      <Card.Title >{user.username}</Card.Title>
                       {request.basket.basket_state === 'BP' ? 
                       <>
                        <Card.Text className='fst-italic'>Being Processed</Card.Text>
                        <Button style={{backgroundColor:'#060b26'}} type="submit" disabled>view</Button>
                       </>                      
                      :
                      <>
                        <Card.Text className='fst-italic'>Processed</Card.Text>
                        <Link to={`${request.id}`}><Button style={{backgroundColor:'#060b26'}} type="submit">view</Button></Link>
                      </>
                      }

                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>}
      </>)
  }
  

export default FollowUp;