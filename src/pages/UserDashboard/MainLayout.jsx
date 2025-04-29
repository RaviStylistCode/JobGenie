import React from 'react'
import UserLeftsidebar from './UserLeftsidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <UserLeftsidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout