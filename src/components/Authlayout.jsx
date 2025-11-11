import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Authlayout({authentication=true,children}) {
    // Authlayout is a layout component for authentication pages
    // It checks if the user is authenticated and redirects them accordingly
    const navigate= useNavigate()
    const [loading, setLoading]= useState(true)
    const authstatus=useSelector((state)=>(state.auth.status))
    useEffect(()=>{
        if(authentication && authstatus!== authentication){
            navigate('/login')
        }
        else if(!authentication && authstatus !== authentication){
            navigate('/')
        }
        setLoading(false)
    }
    ,[authstatus,authentication,navigate])
  return loading? <div>Loading...</div>:<>{children}</>
}

export default Authlayout