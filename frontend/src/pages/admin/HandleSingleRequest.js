import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Table, Form, Button } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners'



const HandleSingleRequest = () => {
    const navigate = useNavigate()
    const { requestid, userid } = useParams()
    let [request, setRequest] = useState({})
    let [items, setItems] = useState()
    let [user, setUser] = useState({})
    let [isDisabled, setDisabled] = useState(true)
    const [isloading, setIsLoading] = useState(true)
    const { authTokens } = useContext(AuthContext)

    const getRequest = async () => {
        let response = await fetch(`${process.env.REACT_APP_URL}/api/requests/${requestid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        }, [])

        let data = await response.json()

        if (response.status === 200) {
            setRequest(data)
            setItems(data.basket.items);
            setIsLoading(false)
        } else {
            console.log('requests could not be loaded')
        }

    }

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/users/${userid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        const data = await response.json()
        if (response.status === 200) {
            setUser(data)
            setIsLoading(false)
        } else {
            console.log('error');
        }
    }


    useEffect(() => {
        getRequest();
        getUser();
        console.log(items);
    }, [])

    const  handelChange = (e, itemObj) =>{
        //create a copy of list state
        let newItems = [...items]
        const itemIndexInList = newItems.indexOf(itemObj)//retrieve targeted item's index in the list
        newItems[itemIndexInList].state = e.target.value//update state
        setItems(newItems)//set new state

        //map through items and update validate state accordingly 
        setDisabled(false)
        items.map( item => {
            if(item.state === 'BP'){
                setDisabled(true)
            }
        } )
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        let response = await fetch(`${process.env.REACT_APP_URL}/api/requests/process`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                "basket_id" : request.basket.id,
                "items" :items
            })
          })
      
          if (response.status === 200) {
            navigate('/')
          } else {
            alert('Something went wrong!')
          }

    }

    return (
        <>
             {isloading ?
        <BeatLoader color={'#060b26'} loading={isloading} size={150} />
        : <>
            <h1>Handle Request</h1>
            <div className='d-flex justify-content-end'>
            <p className='fst-italic'>requested by: <strong>{user.first_name}</strong> <strong>{user.last_name}</strong> on <u>{request.created_at?.slice(0,10)}</u></p>
            </div>
                <Form onSubmit={(e)=> handleSubmit(e)}>
                    <Button type="submit" disabled={isDisabled} variant="success">Validate</Button>
                    <Button type="reset"   variant="primary" className='mx-2'>Reset</Button>
                    <Link  to='/admin'><Button variant='dark' className='mx-2'>Cancel</Button></Link>

                    <Table striped bordered hover size="sm" className='mt-2'>
                        <thead>
                            <tr>
                                <th className='px-3'>Article</th>
                                <th className='px-3'>Quanity in stock</th>
                                <th className='px-3'>Article's Category</th>
                                <th className='px-3'>Quanity requested</th>
                                <th className='px-3'>Quanity requested</th>
                                <th className='px-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items?.map(item => {
                                return (
                                    <tr key ={item.id}>
                                        <td className='px-3'>{item.article.name}</td>
                                        <td className='px-3'>{item.article.quantity}</td>
                                        <td className='px-3'>{item.article.category.name}</td>
                                        <td className='px-3'>{item.qte_requested}</td>
                                        <td className='px-3'>{item.observation}</td>
                                        <td>

                                            <div key={`inline-radio`} className="mb-3">
                                                <Form.Check
                                                    inline
                                                    label="accept"
                                                    name={`group${item.id}`}
                                                    type={'radio'}
                                                    value="A"
                                                    id={`inline-radio-1`}
                                                    onChange={ e => handelChange(e, item)}                                                />
                                                <Form.Check
                                                    inline
                                                    label="reject"
                                                    name={`group${item.id}`}
                                                    type={'radio'}
                                                    value="R"
                                                    id={`inline-radio-2`}
                                                    onChange={ e => handelChange(e, item)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </Table>
                </Form>
            </>
            }
        </>)

}

export default HandleSingleRequest;