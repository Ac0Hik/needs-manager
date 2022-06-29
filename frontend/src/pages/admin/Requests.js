import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext'
import { BeatLoader } from 'react-spinners'
import {FaArrowsAltV} from 'react-icons/fa'

const Requests = () => {
  const { authTokens } = useContext(AuthContext)
  let [requests, setRequests] = useState([])
  const [usernames, setUsernames] = useState([])
  const [isloading, setIsLoading] = useState(true)

  const getRequests = async () => {
    let response = await fetch(`${process.env.REACT_APP_URL}/api/requests/`, {
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
  const handleClick = ()=>{
    const reversedArray = requests.reverse()
    setRequests([...reversedArray])
  }
  const handleChange = (e)=>{
    const userObject = usernames.find(user => user.username === e.target.value)
    console.log(userObject);
    if(userObject){
      const filteredRequests = requests.filter(request => request.created_by_id === userObject?.id)
      setRequests([...filteredRequests])
    }

    //const test = requests.filter(request => request.created_by_id = e.target.name)
  }

  useEffect(() => {
    getUsernames();
    getRequests();
  }, [])

  return (
    <>{isloading ?
      <BeatLoader color={'#060b26'} loading={isloading} size={150} />
      :
      <>
        <h1>ALL Requests</h1>
        <Container>
          <div className='d-flex mb-2'>

          <Button className='' style={{backgroundColor:'#060b26'}} onClick={handleClick}><FaArrowsAltV /></Button>
          <form className='mx-1'><input type="text" name="name" placeholder='Search....' className='py-1' onChange={handleChange}/></form>
          </div>
          <Row xs={1} md={2} className="g-4">
            {requests.map((request) => (
              <Col>
                <Card className="px-5 pt-3"  border={ request.basket.basket_state === 'P' ? "success" : "secondary"}>
                  <Card.Img className="round img-fluid" style={{ width: "150px", height: "150px" }} variant="top" src="https://icon-library.com/images/free-avatar-icon/free-avatar-icon-10.jpg" />
                  <Card.Body>
                    <Card.Title>{request.created_at?.slice(0, 10)}</Card.Title>
                    <Card.Title >{usernames.find(user => user["id"] === request.created_by_id).username}</Card.Title>
                     {request.basket.basket_state == 'BP' ? 
                     <>
                      <Card.Text className='fst-italic'>Being Processed</Card.Text>
                    <Card.Text>
                    {request.basket.items.map(item => { return (<span className='text-secondary'>{`${item.article.name.toUpperCase() + ' : ' + item.qte_requested}`}</span>) })}
                    </Card.Text>                   
                     </>
                    :
                    <>                    
                    <Card.Text className='fst-italic'>Processed</Card.Text>
                    <Card.Text>
                      {request.basket.items.map(item => { return (<span key={item.id} className={`${item.state === 'A' ? "text-success": "text-danger"}`}>{`${item.article.name.toUpperCase() + ' : ' + item.qte_requested}`}</span>) })}
                    </Card.Text>
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

export default Requests;