import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate} from 'react-router-dom'
const PrivateRoute = () => {
    const {currentUser} = useSelector(state => state.user)
    console.log(currentUser)

  return (
    <>
    {currentUser ? <Outlet/> : <Navigate to='/signIn'/>}
    </>
  )
}

export default PrivateRoute