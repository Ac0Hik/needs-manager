import React,{ useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const EditUser = () => {
  
  const navigate = useNavigate()
  const { userid } = useParams()
  let {authTokens} = useContext(AuthContext)
  const [user ,setUser] = useState({})



    const  getUser = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/users/${userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      const data= await response.json()
      if(response.status === 200){
       console.log(data)
       setUser(data)
      }else{
        console.log('error');
      }
    }

    useEffect(()=>{
      getUser()
    },[userid])

    const handleChange = e => {
      setUser({...user,[e.target.name]:e.target.value})
  }

    //post data to the api
    let handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_URL}/api/users/update/${user.id}`, {
          method:'PUT',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body:JSON.stringify({
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "is_staff": user.is_staff,
            "profiles": {
                "is_manager": user.profiles.is_manager
            }
        })
      })

      if(response.status === 200){
         navigate('/admin/users')
      }else{
          alert('Something went wrong!')
      }
    }
   
  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" >
        <Form.Label>username</Form.Label>
        <Form.Control name="username" type="text" value={user.username} placeholder="Enter username" onChange={(e)=> handleChange(e)} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>first name</Form.Label>
        <Form.Control name="first_name" type="text" value={user.first_name} placeholder="Enter your first name" onChange={(e)=> handleChange(e)} required/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>last name</Form.Label>
        <Form.Control name="last_name" type="text" value={user.last_name} placeholder="Enter email" onChange={(e)=> handleChange(e)} required/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" value={user.email} placeholder="Enter email" onChange={(e)=> handleChange(e)} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check name="is_manager" type="checkbox" checked={user.profiles?.is_manager} label="is manager ?" 
        onChange={(e)=>
         setUser(prevUser =>({
          ...prevUser, profiles:{
            ...prevUser.profiles,
            is_manager : !prevUser.profiles.is_manager
          }}))}
          />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check name="is_staff" type="checkbox" checked={user.is_staff} label="is admin ?" onChange={(e)=>
        setUser(prevUser=>({
          ...prevUser,
          is_staff : !prevUser.is_staff
        }))
        }/>
      </Form.Group>
      <Button className="pl-2" variant="primary" type="submit">
        Update
      </Button>
      <Link to="/admin/users"><Button variant="dark" className='ms-2' >
        Cancel
      </Button></Link>
    </Form>
  )
}

export default EditUser;