import conf from "../config/conf";
import { Client, Account, ID } from "appwrite"

export class Authservice {
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account=new Account(this.client)
    }
    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call another method
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
        async login({ email, password }) {
        try {
            // create a session → Appwrite automatically stores it in cookies
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("✅ Logged in successfully:", session);

            // you don't need to manually create or set JWT on the client
            return session;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
        }
    async getCurrentUser(){
        try {
            return await this.account.get();
            
        } catch (error) {
            console.log("Appwrite service ::getCurrentUser :: error",error)
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions();
            
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error)
        }
    }
}
const authservice = new Authservice();
export default authservice