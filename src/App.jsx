
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authservice from '../src/appwrite/auth'
import {storeLogin,storeLogout} from '../src/store/authSlice'
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading,setLoading]= useState(true);
  const dispatch= useDispatch();
  useEffect(()=>{
    authservice.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(storeLogin({userData}))
      }
      else{
        dispatch(storeLogout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading? (
    <div className="flex flex-wrap min-h-screen content-between bg-gray-400">
    <div className="w-full block ">
      <Header/>
      <main>
        {/* todo: */}
        <Outlet/>
      </main>
      <Footer/>
    </div>
    </div>
  ):(
    <div>
      <img src="https://img.icons8.com/?size=100&id=qCzYpGbgQBVV&format=png&color=000000" alt="image" />
      <div>Loading...</div>
    </div>
  )
}

export default App
