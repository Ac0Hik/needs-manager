import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../../components/UserNavbar'

const UsersLayout = () => {
  return (
    <>
      <UserNavbar />
      <div className='container py-3'>
        <Outlet />
      </div>
    </>
  )
}


export default UsersLayout;