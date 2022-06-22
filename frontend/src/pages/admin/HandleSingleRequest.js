import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Table, Form } from 'react-bootstrap';



const HandleSingleRequest = () => {
    const { requestid, userid } = useParams()
    let [request, setRequest] = useState({})
    let [items, setItems] = useState()
    let [user, setUser] = useState({})
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
            console.table(items)
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
        } else {
            console.log('error');
        }
    }


    useEffect(() => {
        getRequest();
        getUser();
        console.log(items);
    }, [])

    return (
        <>
            <h1>Handle Request</h1>
            <div className='d-flex justify-content-between'>
                <p className='fst-italic'>requested by: <strong>{user.first_name}</strong> <strong>{user.last_name}</strong> on {request.created_at}</p>
                <p className=''>basket state</p>
            </div>
            <Form>
            <Table striped bordered hover size="sm" className='mt-2'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Article</th>
                        <th>Quanity in stock</th>
                        <th>Article's Category</th>
                        <th>Quanity requested</th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items?.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.article.name}</td>
                                <td>{item.article.quantity}</td>
                                <td>{item.article.category.name}</td>
                                <td>{item.qte_requested}</td>
                                <td>
                                <input
          type="radio"
          value="male"
          //checked={gender === 'male'}
          onChange={()=>{}}
        /> Accept
                                    <input
          type="radio"
          value="male"
          //checked={gender === 'male'}
          onChange={()=>{}}
        /> Reject
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
            </Form>
        </>)

}

export default HandleSingleRequest;