import React from 'react'
import { Outlet } from 'react-router-dom'
import RecLeftSidebar from './RecLeftSidebar'

const RecMainLayout = () => {
  return (
    <div>
        <RecLeftSidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default RecMainLayout