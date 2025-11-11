import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
};
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        //reducer ke andar ye methods actions kehlate hai.
        storeLogin:(state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },
        storeLogout:(state)=>{
            state.status=false;
            state.userData=null;
        }
    }
})
export const {storeLogin, storeLogout}= authSlice.actions;
export default authSlice.reducer;