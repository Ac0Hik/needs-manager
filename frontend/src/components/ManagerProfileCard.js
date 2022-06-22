import React, { useState, useEffect, useContext } from 'react'
import './ProfileCard.css'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const ManagerProfileCard = () => {
    let { authTokens, user } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState({})



    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/users/${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        const data = await response.json()
        if (response.status === 200) {
            setCurrentUser(data)
        } else {
            console.log('error');
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    return (

        <div className='container d-flex justify-content-center '>
            <div className="card-container px-3">
                <span className="pro">Manager</span>
                <img className="round img-fluid" src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="user" />
                <h3 className="cardusername">{currentUser.first_name} {currentUser.last_name}</h3>
                <h6>{currentUser.username}</h6>
                <p className='userEmail'>{currentUser.email}</p>
                <div className="buttons">
                    <button className="primary">
                        <Link to="update" style={{ textDecoration: 'none' }}>Update</Link>
                    </button>
                </div>
                <div className="skills">

                </div>
            </div>
        </div>

    )
}

export default ManagerProfileCard;