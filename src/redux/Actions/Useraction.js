import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        company:null,
        profile:null
    },

    reducers:{

        setAuthuser:(state,action)=>{
            state.user=action.payload;
        },

        setCompany:(state,action)=>{
            state.company=action.payload;
        },

        logout:(state,action)=>{
            state.user=null;
            state.company=null;
            state.profile=null;
        },

        setProfile:(state,action)=>{
            state.profile=action.payload;
        }

    }
});

export const {setAuthuser,logout,setCompany,setProfile}=userSlice.actions;
export default userSlice.reducer;