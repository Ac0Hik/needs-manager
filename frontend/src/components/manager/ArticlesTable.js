import React, {useContext, useState, useCallback, useEffect} from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ArticlesTable = () => {
    const [articles, setArticles] = useState([])
    let { authTokens, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate(); 
  
    let loadArticles = useCallback(async () => {
  
        let response = await fetch(`${process.env.REACT_APP_URL}/api/articles/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        }, [])
    
        let data = await response.json()
    
        if (response.status === 200) {
          setArticles(data)
        } else if (response.statusText === 'Unauthorized') {
          logoutUser()
        }
      }
    ,[authTokens.access, logoutUser])
  
    let deleteArticle = async(e, id)=>{
      e.preventDefault();
      let response = await fetch(`${process.env.REACT_APP_URL}/api/articles/delete/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
  
      })
      if(response.status === 200){
        alert('article has been deleted successfully')
      }else{
        alert('article could not be deleted')
      }
  
    }
  
    useEffect(() => {
      loadArticles()
    }, [])
  
    return (
  
      <>
  
      <Table striped bordered hover size="sm" className='mt-2'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quanity</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => {
              return (
                <tr key={article.id}>
                  <td>{article.id}</td>
                  <td>{article.name}</td>
                  <td>{article.description}</td>
                  <td>{article.quantity}</td>
                  <td>{article.category.name}</td>
                  <td>
                    <form onSubmit={e=>deleteArticle(e, article.id)}>
                      <Link  to={`update/${article.id}`}><Button variant="primary" className='mx-2'>edit</Button></Link>
                      <input type="submit" value="delete" className='btn btn-danger ' />
                    </form>
                  </td>
                </tr>
              )
            })}
  
          </tbody>
        </Table>
      </>
    )
  }
export default ArticlesTable