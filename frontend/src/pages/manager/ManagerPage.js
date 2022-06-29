import React, { useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const ManagerPage = () => {
    
    let {user} = useContext(AuthContext)

    return(       
        <>
          <h1>Welcome back {user.username}</h1>
          <Button className='mb-4' style={{backgroundColor: '#060b26'}}><Link style={{ textDecoration: 'none', color: '#fff' }} to='articles'>articles</Link></Button>
          <Button className='mb-4 mx-2' style={{backgroundColor: '#060b26'}}><Link style={{ textDecoration: 'none', color: '#fff' }} to='categories'>categories</Link></Button>

        </>
    )
}
export default ManagerPage;