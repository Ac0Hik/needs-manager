import React, { useEffect, useState, useContext } from 'react'
import ItemsList from '../../components/ItemsList';
import ItemsForm from './ItemsForm';
import { BeatLoader } from 'react-spinners'
import AuthContext from '../../context/AuthContext'




const AddRequestForm = () => {
  let {authTokens} = useContext(AuthContext)
  const [itemsList, setItemsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  let [articles, setArticles] = useState([])
  let [categories, setCategories] = useState([])
  let [loading, setLoading] = useState(true)



  const getCategoriesArticles = async () => {

      let response = await fetch(`${process.env.REACT_APP_URL}/api/formdata`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      }, [])
  
      let data = await response.json()
  
      if (response.status === 200) {
        setCategories(data.categories) 
        setArticles(data.articles) 
        setLoading(false)   
      } 
    }

    useEffect(()=>{
      getCategoriesArticles()
},[])


  const [item, setItem] = useState({
    article_id: null,
    category_id: null,
    observation: '',
    qte: 0
  })



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(itemsList);

  }


  const addItem = () => {
    if (!item.article_id
      || !item.category_id
      || !item.qte
      || !item.observation
    ) {
      // display errors
      console.log("please enter the whoe info")
    }
    else if (isEditing) {

      setItemsList(
        itemsList.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              article_id: item.article_id,
              category_id: item.category_id,
              observation: item.observation,
              qte: item.qte
            };
          }
          return item;
        })
      );
      setItem({
        article_id: null,
        category_id: null,
        observation: '',
        qte: 0
      })
      setEditID(null);
      setIsEditing(false);
      // showAlert(true, 'success', 'value changed');

    }

    else {
      const {
        article_id,
        category_id,
        observation,
        qte } = item;

      const newItem = {
        id: new Date().getTime().toString(),
        article_id,
        category_id,
        observation,
        qte
      }
      setItemsList([...itemsList, newItem])

      setItem({
        article_id: null,
        category_id: null,
        observation: '',
        qte: 0
      })

    }
  }
  const removeItem = (id) => {
    //// showAlert(true, 'danger', 'item removed');
    setItemsList(itemsList.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = itemsList.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    // setName(specificItem.title);
    setItem({ ...specificItem })
  };





  return (
<>   
     {loading?
        <BeatLoader color={'#060b26'} loading={loading} size={150} />
        :
     <>
      <h1>form page</h1>
      <ItemsForm
        item={item}
        setItem={setItem}
        handleSubmit={handleSubmit}
        addItem={addItem}
        isEditing={isEditing}
        articles={articles}
        categories={categories}
         />
      {itemsList.length > 0 ? 
      <ItemsList
       itemsList={itemsList} removeItem={removeItem}
        editItem={editItem}
        articles={articles}
        categories={categories} />
      :
      null
       }</>
      }
</>
  );
}
export default AddRequestForm;