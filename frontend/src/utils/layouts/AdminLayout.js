import React from 'react'
import AdminHeader from '../../components/AdminHeader'
import { Outlet } from 'react-router-dom'


 const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <div className='container py-3'>
        <Outlet />
      </div>
    </>
  )
}
 export default AdminLayout