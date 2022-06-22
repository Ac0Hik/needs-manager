import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import {  Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

const AddCategory = () => {
  const navigate = useNavigate();
  let {authTokens} = useContext(AuthContext)


  let [category, setCategory] = useState({
      name : "",
      description : "",
  })

  

  const handleChange = e => {
      setCategory({...category,[e.target.name]:e.target.value})
  }



  let handleSubmit = async (e) => {
          e.preventDefault()
          console.table(category);
          let response = await fetch(`${process.env.REACT_APP_URL}/api/categories/add`, {
              method:'POST',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':'Bearer ' + String(authTokens.access)
              },
              body:JSON.stringify({
                  "name":category.name,
                  "description":category.description,
              })
          })
  
          if(response.status === 200){
             navigate('/manager/categories')
          }else{
              alert('Something went wrong!')
          }



  }


return (
  <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" >
      <Form.Label>name</Form.Label>
      <Form.Control name="name" type="text" placeholder="Enter a category name" onChange={(e)=> handleChange(e)} required />
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label>description</Form.Label>
      <Form.Control name="description" type="text" placeholder="Enter description" onChange={(e)=> handleChange(e)} required/>
    </Form.Group>
   
    <Button className="pl-2" variant="primary" type="submit">
      Submit
    </Button>
    <Link to="/manager/categories"><Button variant="secondary" className='ms-2' >
      Cancel
    </Button></Link>
  </Form>
)
}

export default AddCategory;