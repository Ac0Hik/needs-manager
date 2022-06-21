import React,{ useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

const EditCategory = () => {
  const navigate = useNavigate()
  const { categoryid } = useParams()
  let {authTokens} = useContext(AuthContext)
  const [category ,setCategory] = useState({})



    const  getCategory = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/categories/${categoryid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      const data= await response.json()
      if(response.status === 200){
       setCategory(data)
      }else{
        console.log('error');
      }
    }

    useEffect(()=>{
      getCategory()
    },[categoryid])

    const handleChange = e => {
      setCategory({...category,[e.target.name]:e.target.value})
  }

    //post data to the api
    let handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_URL}/api/categories/update/${categoryid}`, {
          method:'PUT',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body:JSON.stringify({
              "name": category.name,
              "description": category.description   
        })
      })

      if(response.status === 200){
         alert('user has been updated succefuly')
         navigate('/manager/categories')
      }else{
          alert('Something went wrong!')
      }
    }
   
  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" >
        <Form.Label>uname</Form.Label>
        <Form.Control name="name" type="text" value={category.name} placeholder="Enter username" onChange={(e)=> handleChange(e)} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>description</Form.Label>
        <Form.Control name="description" type="text" value={category.description} placeholder="Enter your first name" onChange={(e)=> handleChange(e)} required/>
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


export default EditCategory;