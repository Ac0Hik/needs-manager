import React from 'react'
import ArticlesTable from '../../../components/manager/ArticlesTable';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Articles = () => {
  return (
    <>
      <h3>Articles</h3>
      <p className='fst-italic'>dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak</p>
      <Link to="add" ><Button variant="success" >create new Article</Button></Link>
      <ArticlesTable />
    </>
  )
}

export default Articles;