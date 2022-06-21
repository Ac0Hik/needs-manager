import React, { useContext} from 'react'
import AuthContext from '../../context/AuthContext'

const ManagerPage = () => {
    
    let {user} = useContext(AuthContext)

    return(
        
        <>
          <p>manager page</p>
           { user.is_manager ? <p>you are a manager</p>  : <p>you are not a manger</p> }
        </>
    )
}
export default ManagerPage;