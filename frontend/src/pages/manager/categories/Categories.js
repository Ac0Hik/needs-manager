import React from 'react'
import CategoriesTable from '../../../components/manager/CategoriesTable';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {FaPlusSquare} from "react-icons/fa";


const Categories = () => {
  return (
    <>
    <h3>Categories</h3>
    <p className='fst-italic'>dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak</p>
    <Link to="add" ><Button variant="success" >Create new category <FaPlusSquare fill='#febc0a' size={'1.5rem'}/></Button></Link>
    <CategoriesTable />
  </>
  )
}

export default Categories;