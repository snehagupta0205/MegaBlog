import React, { use, useEffect } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import appwriteservice from "../appwrite/config"
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Input, Button, Select ,RTE} from './index'


function Postform({post}) {
    //watch and setvalue use to watch the changes in the form and set the values of the form inputs respectively.
    //register is used to register the inputs with react hook form and handleSubmit is used to handle the form submission.
    //useForm is a custom hook that provides methods to manage form state and validation.
    const {register, handleSubmit, getValues, control, setValue,watch} = useForm({
        defaultValues:{
            title: post?.title||'',
            content: post?.content||'',
            slug: post?.slug||'',
            status: post?.status||'draft',
        },
    })//register tracks inputs and add validations like required ,minlength etc and handleSubmit handles the form submission
    const navigate=useNavigate();
    const userData= useSelector((state)=>(state.auth.userData));//gets userdata from the store
    const submit = async (data)=>{
        if(post){
            //if post aready exists it updates the image if selected, deletes old image and updates post in database using updatepost and redirects to the updated post page.
            const file= data.image[0]? appwriteservice.uploadFile(data.image[0]): null
            if(file){
                appwriteservice.deleteFile(post.featuredImage);
            }
            const dbpost= await appwriteservice.updatePost(post.$id,{...data, featuredImage:file? file.$id: undefined})
            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }else{
            const file= await appwriteservice.uploadFile(data.image[0]);
            if(file){
                const fileId= file.$id;
                data.featuredImage=fileId;//the file id which is the image id in the databse becomes the id of the featured image.
                const dbpost= await appwriteservice.createPost({...data,userId:userData.$id});
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }//it creates a new post with form data and user is redirected to the new post page.
        }
        const slugtransform= useCallback((value)=>{
            if(value && typeof value==='string'){
                return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-');
            }
            return "";
        },[]);//converts post tiltle into url friendly slug by removing weird characters, replacing spaces with hyphens and making it lowercase
        useEffect(()=>{
            const susbscription=watch((value,{name})=>{
                if(name==='title'){
                    setValue("slug", slugtransform(value.title),{shouldValidate:true})
                }
            })
            return ()=> susbscription.unsubscribe();
        },[slugtransform,watch, setValue])//if the title changes the slug gets autoupdated and keeps the slug synced with the title.
    }
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
             <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                {/* on the left side contains title content and slug, content is controlled by tinymce using control of react hook form as it builds a bridge */}
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteservice.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default Postform