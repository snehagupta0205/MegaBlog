import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Container, Button } from '../components'
import parse from 'html-react-parser'
import appwriteservice from '../appwrite/config'
import { useSelector } from 'react-redux'

function post() {
    const [post, setPost] =useState(null);
    const navigate= useNavigate();
    const {slug}=useParams();
    const userData= useSelector((state)=>(state.auth.userData));

    const isAuthor= post&& userData? post.userId===userData.$id:false;
    useEffect(()=>{
        if(slug){
            appwriteservice.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
                else{
                    navigate('/')
                }
            });
        }
        else{
            navigate('/')
        }   
    },[slug,navigate]) 
    const deletePost=()=>{
        appwriteservice.deletePost(post.$id).then((status)=>{
            if(status){
                appwriteservice.deleteFile(post.featuredImage).then(() => {
                    navigate('/');
                });
            }
        })
    }
  return post ?(
    <div className='py-8 w-full'>
        <Container>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                <img src={appwriteservice.getfilePreview(post.featuredImage)} alt={post.title} className='rounded-xl'/>
                {isAuthor && (
                    <div className='absolute top-6 right-6'>
                        <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor='bg-green-500' className='mr-3'>Edit</Button></Link>
                        <Button onClick={deletePost} bgColor='bg-red-500'>Delete</Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
        </Container>
    </div>
  ) : null;
}

export default post