import React, {useContext, useState, useCallback, useEffect} from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const CategoriesTable = () => {
    const [categories, setCategories] = useState([])
    let { authTokens, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate(); 
  
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
          logoutUser()
        }
      }
    ,[authTokens.access, logoutUser])
  
    let deleteCategory = async(e, id)=>{
      e.preventDefault();
      let response = await fetch(`${process.env.REACT_APP_URL}/api/categories/delete/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
  
      })
      if(response.status === 200){
        alert('category has been deleted successfully')
      }else{
        alert('category could not be deleted')
      }
  
    }
  
    useEffect(() => {
      loadCategories()
    }, [])
  
    return (
  
      <>
  
      <Table striped bordered hover size="sm" className='mt-2'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <form onSubmit={e=>deleteCategory(e, category.id)}>
                      <Link  to={`update/${category.id}`}><Button variant="primary" className='mx-2'>edit</Button></Link>
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

export default CategoriesTable;