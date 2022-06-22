import React, { useState, useEffect, useContext } from 'react'
import './ProfileCard.css'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const UserProfileCard = () => {
    let { authTokens } = useContext(AuthContext)
    const {userid} = useParams()
    const [currentUser, setCurrentUser] = useState({})

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/users/${userid}`, {
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
                {currentUser.is_staff ? <span class="pro">Admin</span>
                    : currentUser.profiles?.is_manager ? <span class="pro">Manager</span>
    : <span class="pro">Professor</span>}
                <img class="round img-fluid" src="https://i.pinimg.com/564x/72/cd/96/72cd969f8e21be3476277d12d44c791c.jpg" alt="user" />
                <h3 class="cardusername">{currentUser.first_name} {currentUser.last_name}</h3>
                <h6>{currentUser.username}</h6>
                <p class='userEmail'>{currentUser.email}</p>
                <div class="buttons">
                    <button class="primary">
                        <Link to={`/admin/users/update/${currentUser.id}`} style={{ textDecoration: 'none' }}>Update</Link>
                    </button>
                </div>
                <div class="skills">

                </div>
            </div>
        </div>

    )
}

export default UserProfileCard;