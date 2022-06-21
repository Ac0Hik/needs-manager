import React from 'react'
import { Outlet } from 'react-router-dom'
import  ManagerHeader  from '../../components/manager/ManagerHeader'


const ManagerLayout = () => {
  return (
    <>
    <ManagerHeader />
    <div className='container py-3'>
      <Outlet />
    </div>
  </>
  )
}

export default ManagerLayout;



