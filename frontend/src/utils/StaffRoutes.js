import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const StaffRoutes = () => {
    let {user } = useContext(AuthContext)

    return(
        user ? 
              user.is_staff ?
               <Outlet/> : 
               <Navigate to="/" />
             :<Navigate to="/login" /> 
    )
}

export default StaffRoutes;