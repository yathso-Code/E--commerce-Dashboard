import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
function PrivateCom() {
 const auth = localStorage.getItem('user');
  return auth?<Outlet/>:<Navigate to='/singup'/>
}

export default PrivateCom