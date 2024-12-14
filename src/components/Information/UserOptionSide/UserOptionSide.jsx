import React from 'react';
import { Outlet } from 'react-router-dom';

//component này chỉ làm nhiệm vụ cung cấp outlet
function UserOptionSide() {
  return (
    <div className='pb10'>
        <Outlet />
    </div>
  )
}

export default UserOptionSide