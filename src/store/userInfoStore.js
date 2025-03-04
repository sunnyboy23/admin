import { createSlice } from "@reduxjs/toolkit";



const counterSlice = createSlice({
    name:'userInfoStore',
    initialState:{
        userInfo:null

    },
    reducers:{
        changeInit:(state,val) =>{
            state.userInfo = val.val
        }
    }
})


export const {incremented,decremented} = counterSlice.actions

export default counterSlice.reducer