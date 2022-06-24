import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'



const ItemsForm = ({ item, setItem, addItem, isEditing, articles, categories }) => {


    let [isCategorySelected, setIsCategorySelected] = useState(false)

    return (
        <>
       
        <Form className='container' onSubmit={(e)=> {e.preventDefault(); addItem()}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" 
                    value={item.category_id} 
                    onChange={(e) => {setIsCategorySelected(true); setItem({ ...item, category_id: e.target.value })}}
                    placeholder='Please Select a Category' 
                     >        
                    {categories.map( (category)=> {
                        return(
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Article</Form.Label>
                <Form.Select name="category" aria-label="Default select example"
                 value={item.article_id} 
                 placeholder='You can select articles once you select the Category'
                 disabled={!isCategorySelected}
                 onChange={(e) => setItem({ ...item, article_id: e.target.value })} 
                >
                    {articles.map(article =>{
                        return(
                            <option key={article.id} value={article.id}>{article.name}</option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="qte" 
                 value={item.qte} 
                 onChange={(e) => setItem({ ...item, qte: e.target.value })} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicobseravtion">
                <Form.Label>Observation:</Form.Label>
                <Form.Control type="text" value={item.observation}
                    onChange={(e) => setItem({ ...item, observation: e.target.value })} placeholder="observation" />
            </Form.Group>
            <Button style={{backgroundColor:'#060b26'}} type="submit">
                {isEditing ? "Update" : "Add to cart"} 
            </Button>
        </Form>
    </>)
}

export default ItemsForm;