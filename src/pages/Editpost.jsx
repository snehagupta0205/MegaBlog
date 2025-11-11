import React from 'react'
import { Postform, Container } from '../components'
import { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteservice from '../appwrite/config'
function Editpost() {
    const [post, setpost] = useState(null)
    const {slug} =useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            appwriteservice.getPost(slug).then((post)=>{
                if(post){
                    setpost(post)
                }
                else{
                    navigate('/')
                }
            })
        }
    },[slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <Postform post={post}/>
        </Container>
    </div>
  ):null
}

export default Editpost