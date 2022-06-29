import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners'
import AuthContext from '../../context/AuthContext';

const FollowUpDetails = () => {
    const { rq_id } = useParams();
    const { authTokens, user } = useContext(AuthContext)
    let [loading, setLoading] = useState(true)
    const [request, setRequest] = useState({})
    const [pdfLink, setPDFlink] = useState('')
    const [items, setItems] = useState([])


    const getRequest = async () => {

        let response = await fetch(`${process.env.REACT_APP_URL}/api/requests/userRequests/${rq_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        }, [])

        let data = await response.json()

        if (response.status === 200) {
            setRequest(data)
            setLoading(false)
            if(request.basket.items){

                const FilteredList = request.basket.items
                console.log(FilteredList)
                FilteredList.map(item => {
                    const {
                        article,
                        category,
                        qte_requested,
                        observation,
                        state
                    } = item;
    
                    const articleName = article.name;
                    const categoryName = category.name;
                    const newItem = {
                        "category": categoryName,
                        "article": articleName,
                        "qte": qte_requested,
                        "description": observation
                    }
                    if (state === "A") {
                        setItems([...items, newItem])
                    }
    
                })
            }
    
                getDownloadUrl(items)
            

        } else {
            console.log('request could not be loaded')
        }


    }

    const getDownloadUrl = async (itemms) => {
        let response = await fetch('https://rest.apitemplate.io/v2/create-pdf?template_id=d6b77b2b25d66a70', {
            method: 'POST',
            headers: {
                'X-API-KEY': String(process.env.REACT_APP_PDFKEY),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "company": "Brand Name",
                    "from": user.username,
                    "date": "2022/10/10",
                    "items": itemms,
                    "executive": "CS Admin",
                    "terms": "Cady Ayyad University, Faculty of science Semlalia, 2022"
                }
            )
        }, [])

        let data = await response.json()

        if (response.status === 200) {
            console.log(data);
            setPDFlink(data.download_url)
        }
    }


    useEffect(() => {
        getRequest();
    }, [])




    return (
        <>{
            loading ?
                <BeatLoader color={'#060b26'} loading={loading} size={150} />
                :
                <>
                    <h1>FollowUpDetails</h1>
                    <Row >

                        <Col >
                            <Card className='p-4' border={request.basket.basket_state === 'P' ? "success" : "danger"}>
                                <Row>
                                    <Col className='col-md-3'>
                                        <Card.Img style={{ width: "250px", height: "250px" }} variant="top" src="https://cdn-icons-png.flaticon.com/512/147/147144.png" />
                                    </Col>
                                    <Col >
                                        <Card.Body>
                                            <div className='d-flex justify-content-around'>
                                                <Card.Title><h2>{user.username}</h2></Card.Title>
                                                <Card.Title><h2>{request.state === 'BP' ? 'Being Processed' : 'Processed'}</h2></Card.Title>
                                                <Card.Title><h2>{request.created_at?.slice(0, 10)}</h2></Card.Title>
                                            </div>
                                            <Card.Text >
                                                <Row className='pb-4'>
                                                    <Col className='font-weight-bold'>Article</Col>
                                                    <Col className='font-weight-bold'>Category</Col>
                                                    <Col className='font-weight-bold'>Quantity</Col>
                                                    <Col className='font-weight-bold'>State</Col>

                                                </Row>
                                                {request.basket.items.map(item => {
                                                    return (
                                                        <Row key={item.id} className='pb-2'>

                                                            <Col>{item.article.name}</Col>
                                                            <Col>{item.article.category.name}</Col>
                                                            <Col>{item.qte_requested}</Col>
                                                            {item.state === 'A' ?
                                                                <Col className='text-success' >Accepted</Col>
                                                                :
                                                                <Col className='text-danger'>Rejected</Col>

                                                            }
                                                        </Row>
                                                    )
                                                })

                                                }
                                            </Card.Text>
                                            <Button style={{ backgroundColor: '#060b26' }}><a href={pdfLink ? pdfLink : ''}>Print</a></Button>
                                        </Card.Body>
                                    </Col>
                                </Row>

                            </Card>
                        </Col>

                    </Row>
                </>}
        </>


    )
}

export default FollowUpDetails