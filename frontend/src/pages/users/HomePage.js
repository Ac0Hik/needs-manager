import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext'

const HomePage = () => {
    let {user } = useContext(AuthContext)

    return (
        <h1>Welcome back {user.username}</h1>
        
    )
}

export default HomePage;
