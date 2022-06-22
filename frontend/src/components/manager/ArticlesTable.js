import React, {useContext, useState, useCallback, useEffect} from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { FaEdit,FaRegTrashAlt } from "react-icons/fa";
import {BeatLoader} from 'react-spinners'



const ArticlesTable = () => {
  const [articles, setArticles] = useState([])
  let { authTokens, logoutUser } = useContext(AuthContext)
  let [isloading, setLoading] = useState(true)
  
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
          setLoading(false)

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
      {isloading ?
          <BeatLoader color={'#060b26'} loading={isloading}  size={150} />
          :
  
      <Table striped bordered hover size="sm" className='mt-2'>
          <thead>
            <tr>
              <th className='px-3'>#</th>
              <th className='px-3'>Name</th>
              <th className='px-3'>Description</th>
              <th className='px-3'>Quanity</th>
              <th className='px-3'>Category</th>
              <th className='px-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => {
              return (
                <tr key={article.id}>
                  <td className='px-3'>{article.id}</td>
                  <td className='px-3'>{article.name}</td>
                  <td className='px-3'>{article.description}</td>
                  <td className='px-3'>{article.quantity}</td>
                  <td className='px-3'>{article.category.name}</td>
                  <td className='px-3'>
                    <form onSubmit={e=>deleteArticle(e, article.id)} className="d-flex justify-content-around">
                      <Link  to={`update/${article.id}`}><FaEdit variant="warning" size={'1.7rem'}/></Link>
                      <Button type='submit' variant='danger'> <FaRegTrashAlt /></Button>
                    </form>
                  </td>
                </tr>
              )
            })}
  
          </tbody>
        </Table>}
      </>
    )
  }
export default ArticlesTable