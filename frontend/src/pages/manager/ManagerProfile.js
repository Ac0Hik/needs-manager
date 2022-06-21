import React, { useEffect, useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ManagerProfile = () => {
  const [profile, setProfile] = useState({})
    let {authTokens,user} = useContext(AuthContext)
    const navigate = useNavigate();

    const getProfile = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/users/${user.user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        })
        const data= await response.json()
        if(response.status === 200){
         setProfile(data)
        }else{
          console.log('error');
        }
      }

    useEffect(()=>{
     getProfile()
    },user.user_id)

    let handleChange = e => {
        setProfile({...profile,[e.target.name]:e.target.value})
    }
    let handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_URL}/api/users/update/${user.user_id}`, {
          method:'PUT',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body:JSON.stringify({
            "id": profile.id,
            "username": profile.username,
            "first_name": profile.first_name,
            "last_name": profile.last_name,
            "email": profile.email,
            "is_staff": profile.is_staff,
            "profiles": {
                "is_manager": profile.profiles.is_manager
            }
        })
      })

      if(response.status === 200){
         alert('user has been updated succefuly')
         navigate('/manager/profile')
      }else{
          alert('Something went wrong!')
      }
    }

    return (
        <>
            <h3>Profile</h3>
            <p className="fst-italic">lorem sdovhwefvwer'coklnodcpsdmcpo isdocercn=ercvre</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>username</Form.Label>
                    <Form.Control name="username" type="text" value={profile.username} placeholder="Enter username" onChange={(e) => handleChange(e)} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>first name</Form.Label>
                    <Form.Control name="first_name" type="text" value={profile.first_name} placeholder="Enter your first name" onChange={(e) => handleChange(e)} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>last name</Form.Label>
                    <Form.Control name="last_name" type="text" value={profile.last_name} placeholder="Enter email" onChange={(e) => handleChange(e)} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" value={profile.email} placeholder="Enter email" onChange={(e) => handleChange(e)} required />
                </Form.Group>
                <Button className="pl-2" variant="primary" type="submit">
                    Update
                </Button>
                <Link to="/manager"><Button variant="dark" className='ms-2' >
                    Cancel
                </Button></Link>
            </Form>
        </>)


}

export default ManagerProfile;