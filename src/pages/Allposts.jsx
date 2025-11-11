import React from 'react'
import { Container } from '../components'
import { useState, useEffect } from 'react'
import appwriteservice from '../appwrite/config'
import Postcard from '../components/Postcard';

function Allposts() {
    const [posts,setPosts] =useState([]);
    useEffect(()=>{
        appwriteservice.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">

            {posts.map((post)=>(
                <div key={post.$id} className="p-2 w-1/4">
                    <Postcard {...post}/>
                </div>
            ))}
            </div>
        </Container>
    </div>
  )
}

export default Allposts