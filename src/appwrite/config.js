import conf from "../config/conf";
import { Client, ID, Databases,Storage,Query } from "appwrite";

export class Service{
    client= new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl);
        this.client.setProject(conf.appwriteProjectId);
        this.databases= new Databases(this.client);
        this.bucket= new Storage(this.client);
    }
    async createPost({title,content,slug,featuredImage,status, userId}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,featuredImage,status,userId})
        } catch (error) {
            console.log("Appwrite server :: createPosterror:",error);
        }
    }
    //we are using slug values for id values 
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,featuredImage,status});
        } catch (error) {
            console.log("Appwrite server :: updatePosterror:",error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
            return true;
        } catch (error) {
            console.log("Appwrite server :: deletePost error:",error);
        }
        return false;
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
        } catch (error) {
            console.log("Appwrite server :: getPost error:",error);
            return false;
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        //here i want to select posts that have active status that's why we ar using queries to get those slug values
        //databases me indexes banayi ho tabhi uspar queries laga sakte wrna nhi laga sakte
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries);
        } catch (error) {
            console.log("Appwrite server::getPosts error:",error)
        }
    }
    //file upload service
    async uploadFile(file){
        try {
            const fileId= await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
            return fileId;
        } catch (error) {
            console.log("Appwrite server :: uploadFile error:",error)
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId,fileId);
            return true;
        } catch (error) {
            console.log("Appwrite server :: deleteFile error:",error)
            return false;
        }
    }
    getfilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
    }
}
const service= new Service()
export default service

