import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ItemsList.css'

const ItemsList = ({ itemsList, removeItem, editItem, articles, categories }) => {

    const getCategoryName = (ID) => categories.find(element => element.id === ID);
    const getArticleName = (ID) => articles.find(element => element.id === ID);

    return (
        <div className='liiista'>
            <h1 >Items List</h1>
            <div className='table-wrapper'>

                <table className='fl-table'>
                    <tr>
                        <th>cat</th>
                        <th>article</th>
                        <th>qte</th>
                        <th>observation</th>
                        <th>Action</th>
                    </tr>
                    {itemsList.map((item) => {
                        const {
                            id,
                            article_id,
                            category_id,
                            observation,
                            qte,

                        } = item;
                       console.log( getCategoryName(category_id));
                        return (
                            <tr key={item.id}>
                                <td>{category_id}</td>
                                <td>{article_id}</td>
                                <td>{qte}</td>
                                <td>{observation}</td>
                                <td> <button
                                    type='button'
                                    className='edit-btn'
                                    onClick={() => editItem(id)}
                                >
                                    <FaEdit />
                                </button>
                                    <button
                                        type='button'
                                        className='delete-btn'
                                        onClick={() => removeItem(id)}
                                    >
                                        <FaTrash />
                                    </button></td>
                            </tr>


                        );
                    })}
                </table>

            </div>
        </div>
    );
};


export default ItemsList;