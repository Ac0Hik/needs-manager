import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

const EditArticle = () => {
  const navigate = useNavigate();
  let { authTokens, logoutUser } = useContext(AuthContext)
  const {articleid} = useParams()
  const [article, setArticle] = useState({})
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

  const getArticle = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/api/articles/${articleid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setArticle(data)
      console.table(data)
    } else {
      console.log('error');
    }
  }



  const handleChange = e => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  }



  let handleSubmit = async (e) => {
    e.preventDefault()
    let response = await fetch(`${process.env.REACT_APP_URL}/api/articles/update/${articleid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        "category_id": article.category.id,
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

  useEffect(() => {
    loadCategories();
    getArticle()
  }, [])




  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>name</Form.Label>
        <Form.Control name="name" type="text" value={article.name} onChange={(e) => handleChange(e)} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>description</Form.Label>
        <Form.Control name="description" type="text" value={article.description} onChange={(e) => handleChange(e)} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Quantity</Form.Label>
        <Form.Control name="quantity" type="number" value={article.quantity} onChange={(e) => handleChange(e)} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Category</Form.Label>
        <Form.Select name="category" aria-label="Default select example"
          onChange={e => { let catObject = JSON.parse(e.target.value); setArticle({ ...article, category: catObject }) }} >
          {categories.map(category => {
            return (
              <option key={category.id} value={JSON.stringify(category)}>{category.name}</option>
            )
          })}
        </Form.Select>
      </Form.Group>


      <Button className="pl-2" variant="primary" type="submit">
        Update
      </Button>
      <Link to="/manager/articles"><Button variant="dark" className='ms-2' >
        Cancel
      </Button></Link>
    </Form>
  )
}


export default EditArticle;