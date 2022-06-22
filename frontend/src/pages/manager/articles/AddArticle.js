import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

const AddArticle = () => {
  const navigate = useNavigate();
  let { authTokens, logoutUser } = useContext(AuthContext)
  const [categories, setCategories] = useState([])

  let loadCategories = useCallback(async () => {

    let response = await fetch(`${process.env.REACT_APP_URL}/api/categories/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    }, [])

    let data = await response.json()

    if (response.status === 200) {
      setCategories(data)
    } else if (response.statusText === 'Unauthorized') {
      navigate('/manager/articles')
    }
  }
    , [authTokens.access, logoutUser])


  let [article, setArticle] = useState({})



  const handleChange = e => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  }



  let handleSubmit = async (e) => {
    e.preventDefault()
    let response = await fetch(`${process.env.REACT_APP_URL}/api/articles/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        "category_id":  article.category.id,
        "name": article.name,
        "description": article.description,
        "quantity": article.quantity
      })
    })

    if (response.status === 200) {
      navigate('/manager/articles')
    } else {
      alert('Something went wrong!')
    }
  }
     
    useEffect(()=>{
      loadCategories()
    },[])




  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter a category name" onChange={(e) => handleChange(e)} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>description</Form.Label>
        <Form.Control name="description" type="text" placeholder="Enter description" onChange={(e) => handleChange(e)} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Quanity</Form.Label>
        <Form.Control name="quantity" type="number" placeholder="Enter quantity" onChange={(e) => handleChange(e)} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Category</Form.Label>
        <Form.Select name="category"aria-label="Default select example" 
         onChange={e => { let catObject = JSON.parse(e.target.value); setArticle({...article, category:catObject})}} >
        {categories.map(category => {
            return(
              <option key={category.id} value={JSON.stringify(category)}>{category.name}</option>
            )
          })}  
        </Form.Select>
      </Form.Group>


      <Button className="pl-2" variant="primary" type="submit">
        Submit
      </Button>
      <Link to="/manager/articles"><Button variant="secondary" className='ms-2' >
        Cancel
      </Button></Link>
    </Form>
  )
}

export default AddArticle;