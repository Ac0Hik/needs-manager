import React from 'react'
import { Form, Button } from 'react-bootstrap'



const ItemsForm = ({error, item, setItem, addItem, isEditing, articles, categories, isCategorySelected, setIsCategorySelected, handleSubmit }) => {

    let i = 0;//for returning the empty select option after adding an item
    let j = 0;
    return (
        <>
            {<span className='text-danger'>  {error.blank}</span>}
            <Form className='container' onSubmit={(e) => { e.preventDefault();  addItem() }} >
                <Form.Group className="mb-3" >
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category"
                        onChange={(e) => {  setIsCategorySelected(true); setItem({ ...item, category: JSON.parse(e.target.value) }) }}
                        placeholder='Please Select a Category'

                    > 
                        <option value="" disabled="disabled" selected >--------</option>                    
                        {categories.map((category) => {
                            if(j === 0){
                                j++;
                                return(
                                
                                      <option key={category.id} value={JSON.stringify(category)}>{category.name}</option>
                                
                                )
                            }else{
                            return (<option key={category.id} value={JSON.stringify(category)}>{category.name}</option>)
                        }}
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Article</Form.Label>
                    <Form.Select name="article" aria-label="Default select example"

                        placeholder='You can select articles once you select the Category'
                        disabled={!isCategorySelected}
                        onChange={(e) => { setItem({ ...item, article: JSON.parse(e.target.value) }) }}
                    >

                        {articles.map(article => {
                            
                            if (article.category_id === item.category.id) {
                                if(i === 0){
                                    i++;
                                    return(
                                        <>
                                        <option value="" disabled="disabled" selected={true}>---------</option>
                                        <option key={article.id} value={JSON.stringify(article)}>{article.name}</option>
                                        </>
                                    )
                                }else{
                                return (
                                    <option key={article.id} value={JSON.stringify(article)}>{article.name}</option>

                                )
                            }}
                        }
                        )
                        }
                    </Form.Select>
                    {<span className='text-danger'>{error.blackListed}</span>}
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="qte"
                        value={item.qte}
                        onChange={(e) => setItem({ ...item, qte: e.target.value })}
                    />
                    {<span className='text-danger'> {error.outOfStock}</span>}
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Observation:</Form.Label>
                    <Form.Control type="text" value={item.observation}
                        onChange={(e) => { setItem({ ...item, observation: e.target.value }) }} placeholder="observation" />
                </Form.Group>
                <Button style={{ backgroundColor: '#060b26' }} type="submit" >
                    {isEditing ? "Update" : "Add to cart"}
                </Button>

            </Form>
        </>)
}

export default ItemsForm;