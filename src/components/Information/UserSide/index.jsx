import React from 'react'
import { Outlet } from 'react-router-dom'
function UserSide() {
  return (
    <div className='pb10'>
        <Outlet />
    </div>
  )
}

export default UserSide