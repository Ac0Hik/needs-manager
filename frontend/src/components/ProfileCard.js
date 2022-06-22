import React, { useState, useEffect, useContext } from 'react'
import './ProfileCard.css'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const ProfileCard = () => {
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

        <div className='container d-flex justify-content-center'>
            <div class="card-container px-3">
                <span class="pro">Admin</span>
                <img class="round img-fluid" src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="user" />
                <h3 class="cardusername">{currentUser.first_name} {currentUser.last_name}</h3>
                <h6>{currentUser.username}</h6>
                <p class='userEmail'>{currentUser.email}</p>
                <div class="buttons">
                    <button class="primary">
                        <Link to="update" style={{ textDecoration: 'none' }}>Update</Link>
                    </button>
                </div>
                <div class="skills">

                </div>
            </div>
        </div>

    )
}

export default ProfileCard