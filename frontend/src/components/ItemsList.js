import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ItemsList.css'

const ItemsList = ({itemsList, removeItem, editItem, setIsCategorySelected, handleSubmit }) => {


    return (
        <div className='liiista'>
            <div className='table-wrapper'>
            <h1 className='mt-3'>Items List</h1>

                <table className='fl-table'>
                    <tbody>
                    <tr>
                        <th>Category</th>
                        <th>Article</th>
                        <th>Quantity</th>
                        <th>Observation</th>
                        <th>Action</th>
                    </tr>
                    {itemsList.map((item) => {
                        const {
                            id,
                            article,
                            category,
                            observation,
                            qte,

                        } = item;

                        return (
                            <tr key={item.id}>
                                <td>{category.name}</td>
                                <td>{article.name}</td>
                                <td>{qte}</td>
                                <td>{observation}</td>
                                <td> <button
                                    type='button'
                                    className='edit-btn'
                                    onClick={() => { setIsCategorySelected(true); editItem(id)}}
                                >
                                    <FaEdit />
                                </button>
                                    <button
                                        type='button'
                                        className='delete-btn'
                                        onClick={() => removeItem(id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>


                        );
                    })}
                    </tbody>
                </table>
            <Button variant='success my-2 mx-4' onClick={()=>{ handleSubmit()}}>Send Request</Button>                     
            </div>
        </div>
    );
};


export default ItemsList;