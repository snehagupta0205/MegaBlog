import React from 'react'
import { useDispatch } from 'react-redux'
import {storeLogout} from '../store/authSlice'
import authservice from '../appwrite/auth'
function Logoutbtn() {
    const dispatch= useDispatch();
    const logoutHandler=()=>{
        authservice.logout().then(()=>{
            dispatch(storeLogout())//this is done to update the value in store about the logout
        })
    }
  return (
    <div className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logoutbtn</div>
  )
}

export default Logoutbtn