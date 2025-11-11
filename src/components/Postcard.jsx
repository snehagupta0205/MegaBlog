import React from 'react'
import appwriteservice from '../appwrite/config'
import { Link } from 'react-router-dom'
function Postcard({$id, featuredImage, title}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full rounded-xl p-4 bg-gray-100'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteservice.getfilePreview(featuredImage)} alt={title} className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
    //$id post ki id hai appwrite me aur faeturedimage dalne par image ki id to chali jayegi. appwrite ki servvice use karke get file preview le rahe

  )
}

export default Postcard