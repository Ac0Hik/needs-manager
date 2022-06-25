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
  let [isCategorySelected, setIsCategorySelected] = useState(false)
  let [blacklistedIds, setBlackListedIds] = useState([])
  const [error, setError] = useState({
    blank:'',
    outOfStock:'',
    negativeNumber:'',
    blackListed:''
  })




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
    article:{id: null, name:'', quantity:null, category_id:null},
    category: {id:null, name:''},
    observation: '',
    qte: ''
  })



  const handleSubmit = async () => {
    console.log(itemsList);
  //   let response = await fetch(`${process.env.REACT_APP_URL}/api/requests/add`, {
  //     method:'POST',
  //     headers:{
  //         'Content-Type':'application/json',
  //         'Authorization':'Bearer ' + String(authTokens.access)
  //     },
  //     body:JSON.stringify(itemsList)
  // })

  // if(response.status === 200){
  //   alert('perfectoo')
  // }else{
  //     alert('Something went wrong!')
  // }


  }


  const addItem = () => {
    if (!item.article.id
      || !item.category.id
      || !item.qte
      || !item.observation
    ) {
      setError({...error, blank:'entries can not be blank'})
    }else if(item.article.quantity < item.qte){//not in stock
      setError({...error, outOfStock:'we do not have enough in our storage'})
    }else if(item.qte <= 0){// negative number
      setError({...error, negativeNumber :'quantity can not be a negative number'})
    }else if( blacklistedIds.includes( item.article.id ) ){
      setError({...error, blackListed :'you can add an item only once'})
    }else if (isEditing) {

      setItemsList(
        itemsList.map((itemtoEdit) => {
          if (itemtoEdit.id === editID) {
            return ({
              ...itemtoEdit,
              article: item.article,
              category: item.category,
              observation: item.observation,
              qte: item.qte
            })
          }
          return itemtoEdit;
        })
      );

      setItem({
        article:{id: null, name:'', quantity:null, category_id:null},
        category: {id:null, name:''},
        observation: '',
        qte: ''
      })
      setEditID(null);
      setIsEditing(false);
      setError({
      blank:'',
      outOfStock:'',
      negativeNumber:'',
      blackListed:''
      })
    }else{

      const {
        article,
        category,
        observation,
        qte } = item;


      const newItem = {
        id: new Date().getTime().toString(),
        article : article,
        category: category,
        observation: observation,
        qte: qte
      }
      setItemsList([...itemsList, newItem])
      setBlackListedIds([...blacklistedIds, article.id])
      setIsCategorySelected(false);

      setItem({
        article:{id: null,name:'',quantity:null, category_id:null},
        category: {id:null, name:''},
        observation: '',
        qte: ''
      })


    //add article's id to blacklisted IDs array
    setError({
      blank:'',
      outOfStock:'',
      negativeNumber:'',
      blackListed:''
      })

    }
  }

  const removeItem = (id) => {
    //// showAlert(true, 'danger', 'item removed');
    setItemsList(itemsList.filter((item) => {
                                      if(item.id !== id){
                                        return item;
                                      }else{// article is no longer blacklisted
                                        setBlackListedIds(blacklistedIds.filter(id => id !== item.article.id ))
                                        return
                                      }
                                    }));


  };

  const editItem = (id) => {
    //remove article's id from blacklisted Ids so it can allow u to add it again 
    const specificItem = itemsList.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setItem({ ...specificItem })
    setBlackListedIds(blacklistedIds.filter(id => id !== specificItem.article.id ))
    //remove article's id from blacklisted IDs array
  };





  return (
<>   
     {loading?
        <BeatLoader color={'#060b26'} loading={loading} size={150} />
        :
      <>
      <h1>Form page</h1>

      <ItemsForm
        error={error}
        item={item}
        setItem={setItem}
        addItem={addItem}
        isEditing={isEditing}
        articles={articles}
        categories={categories}
        setIsCategorySelected={setIsCategorySelected}
        isCategorySelected={isCategorySelected}
        />

      {itemsList.length > 0 ? 

      <ItemsList
      handleSubmit={handleSubmit}
       itemsList={itemsList} removeItem={removeItem}
        editItem={editItem}
        articles={articles}
        categories={categories}
        setIsCategorySelected={setIsCategorySelected} 
        />

      :
      null
       }
     

      </>}   

</>
  );
}
export default AddRequestForm;