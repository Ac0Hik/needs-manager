import React from 'react'
import ArticlesTable from '../../../components/manager/ArticlesTable';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {FaPlusSquare} from "react-icons/fa";

const Articles = () => {
  return (
    <>
      <h3>Articles</h3>
      <p className='fst-italic'>dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak</p>
      <Link to="add" ><Button variant="success" >Create new Article <FaPlusSquare fill='#febc0a' size={'1.5rem'}/></Button></Link>
      <ArticlesTable />
    </>
  )
}

export default Articles;