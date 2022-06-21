import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'

const UsersLayout = () => {
  return (
    <>
      <Header />
      <h1>this is the shared layout for regular users</h1>
      <Outlet />
    </>
  )
}


export default UsersLayout;