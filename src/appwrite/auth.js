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
    async login({email,password}){
        try{
            const session= await this.account.createEmailPasswordSession(email,password);
             // 2️⃣ now that you have a session, get a JWT
            const { jwt } = await this.account.createJWT();

            // 3️⃣ configure the SDK to use that JWT on every call
            this.client.setJWT(jwt);
            console.log("🔑 JWT set on client:", jwt);
            // 4️⃣ finally return something useful (session, jwt, or both)
            return { session, jwt };
        }
        catch (error) {
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