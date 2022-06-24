import React from 'react'
import { Row, Col, Card, Button, Container } from 'react-bootstrap';

const Tester = () => {
    return (
    <>
        <h1>Handle Requests:</h1>
        <Container>
            <Row xs={1} md={2} className="g-4">
          {Array.from({ length: 2 }).map((_, idx) => (
            <Col>
              <Card className="px-5 pt-3" >
                <Card.Img  className="round img-fluid" style={{width:"150px", height:"150px"}} variant="top" src="https://icon-library.com/images/free-avatar-icon/free-avatar-icon-10.jpg" />
                <Card.Body>
                  <Card.Title>Request Date</Card.Title>
                <Card.Title >User</Card.Title>
                  <Card.Text className='fst-italic'>Basket State</Card.Text>
                  <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                  <Button style={{backgroundColor:'#060b26'}}>click me</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </Container>
    </>  );
}

export default Tester;