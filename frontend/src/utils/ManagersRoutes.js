import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const ManagersRoutes = () => {
    let {user } = useContext(AuthContext)

    return(
        user ? 
              user.is_manager ?
               <Outlet/> : 
               <Navigate to="/" />
             :<Navigate to="/login" /> 
    )
}

export default ManagersRoutes;