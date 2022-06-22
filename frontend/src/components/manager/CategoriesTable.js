import React, {useContext, useState, useCallback, useEffect} from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { FaEdit,FaRegTrashAlt } from "react-icons/fa";
import {BeatLoader} from 'react-spinners'


const CategoriesTable = () => {
    const [categories, setCategories] = useState([])
    let { authTokens, logoutUser } = useContext(AuthContext)
    let [isloading, setLoading] = useState(true)


  
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
          setLoading(false)

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
      {isloading ?
          <BeatLoader color={'#060b26'} loading={isloading}  size={150} />
          :
  
      <Table striped bordered hover size="sm" className='mt-2'>
          <thead>
            <tr>
            <th className='px-4'>#</th>
              <th className='px-4'>Name</th>
              <th className='px-4'>Description</th>
              <th className='px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => {
              return (
                <tr key={category.id}>
                <td className='px-4'>{category.id}</td>
                  <td className='px-4'>{category.name}</td>
                  <td className='px-4'>{category.description}</td>
                  <td className='px-4'>
                    <form onSubmit={e=>deleteCategory(e, category.id)} className="d-flex justify-content-around">
                      <Link  to={`update/${category.id}`}><FaEdit  size={'1.7rem'}/></Link>
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

export default CategoriesTable;