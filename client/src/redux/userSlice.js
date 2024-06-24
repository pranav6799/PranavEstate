import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    loading:false,
    error:null
}
console.log(initialState.currentUser)

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailed:(state,action)=>
            {
            state.error=action.payload;
            state.loading=false;
        },
        updateStart:(state)=>{
            state.loading = true
        },
        updateSuccess:(state,action)=>{
            state.currentUser = action.payload.user;
            state.loading=false;
            state.error=null;
        },
        updateFailed:(state,action)=>
            {
            state.error=action.payload;
            state.loading=false;
        },
        deleteStarted:(state)=>{
            state.loading = true
        },
        deleteSuccess:(state)=>{
            state.currentUser = null;
            state.loading= false
            state.error=null
        },
        deleteFailed:(state,action)=>
            {
            state.error=action.payload;
            state.loading=false;
        },
        singOutStarted:(state)=>{
            state.loading = true
        },
        signOutSuccess:(state)=>{
            state.currentUser = null;
            state.loading= false
            state.error=null
        },
        signOutFailed:(state,action)=>
            {
            state.error=action.payload;
            state.loading=false;
        }
        
    }
    
})
console.log

export const {signInStart,signInFailed,signInSuccess,updateStart,updateSuccess,updateFailed,deleteStarted,deleteSuccess,deleteFailed,singOutStarted,signOutSuccess,signOutFailed} = userSlice.actions
export default userSlice.reducer