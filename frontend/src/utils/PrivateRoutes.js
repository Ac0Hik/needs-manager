import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoutes = () => {
    let {user } = useContext(AuthContext)


    return(
        user ?
                user.is_staff ? <Navigate to="/admin" /> 
                              : user.is_manager ?  <Navigate to="/manager" /> 
                                               :  <Outlet/> 
              :   <Navigate to="/login" /> 
    )
}

export default PrivateRoutes;