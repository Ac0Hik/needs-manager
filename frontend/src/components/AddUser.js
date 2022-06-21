import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import {  Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AddUser = () => {
    const navigate = useNavigate();
    let {authTokens} = useContext(AuthContext)


    let [user, setUser] = useState({
        username : "",
        first_name : "",
        last_name : "",
        email : "",
    })
    let [is_manager, setManager] = useState(false)
    let [is_staff, setStaff] = useState(false)
    
    const {username, first_name, last_name, email} = user;
    const handleChange = e => {
        setUser({...user,[e.target.name]:e.target.value})
    }



    let handleSubmit = async (e) => {
            e.preventDefault()
            let response = await fetch(`${process.env.REACT_APP_URL}/api/users/add`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
                body:JSON.stringify({
                    "username":user.username,
                    "first_name":user.first_name,
                    "email":user.email,
                    "last_name":user.last_name,
                    "is_staff":is_staff,
                    "is_manager":is_manager
                })
            })
    
            if(response.status === 200){
               alert('user has been added succefuly')
               navigate('/admin/users')
            }else{
                alert('Something went wrong!')
            }



    }


  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" >
        <Form.Label>username</Form.Label>
        <Form.Control name="username" type="text" placeholder="Enter username" onChange={(e)=> handleChange(e)} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>first name</Form.Label>
        <Form.Control name="first_name" type="text" placeholder="Enter your first name" onChange={(e)=> handleChange(e)} required/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>last name</Form.Label>
        <Form.Control name="last_name" type="text" placeholder="Enter email" onChange={(e)=> handleChange(e)} required/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" onChange={(e)=> handleChange(e)} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check name="is_manager" type="checkbox" checked={is_manager} label="is manager ?" onChange={(e) =>setManager(!is_manager)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check name="is_staff" type="checkbox" checked={is_staff} label="is admin ?" onChange={(e) =>(setStaff(!is_staff))}/>
      </Form.Group>
      <Button className="pl-2" variant="primary" type="submit">
        Submit
      </Button>
      <Link to="/admin/users"><Button variant="secondary" className='ms-2' >
        Cancel
      </Button></Link>
    </Form>
  )
}

export default AddUser;