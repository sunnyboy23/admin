import { configureStore } from "@reduxjs/toolkit";
import userInfoStore from "./userInfoStore.js";


export default configureStore({
    reducer:{
        userInfoStore,
    }
})



