import React, {useState, useEffect, useContext, useCallback} from 'react'
import AuthContext from '../context/AuthContext'
import Header from './../components/Header'

const HomePage = () => {
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser, user } = useContext(AuthContext)

    useEffect(() => {
        getNotes()
    },[])


    let getNotes = useCallback ( async () =>{
        let response = await fetch(`${process.env.REACT_APP_URL}/api/notes/`, {
            method:'GET',
            headers:{
               'Content-Type':'application/json',
               'Authorization':'Bearer ' + String(authTokens.access)
            }
        },[])
        let data = await response.json()
        

        if(response.status === 200){
            setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
    
    })

    return (
        <div >
            <Header />
            <div className='container'>
                <p>You are logged to the home page! hello {user.username}</p>
                {user.is_staff ? <span>you are an admin</span> : <span>you are a regular user</span>}
                <ul>
                    {notes.map(note => (
                        <li key={note.id} >{note.body}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default HomePage
