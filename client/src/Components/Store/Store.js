import { configureStore } from "@reduxjs/toolkit";
import StateSlice from "./Slices/StateSlice";

const store = configureStore({
    reducer : {
        openLogin : StateSlice.reducer
    }
})
export default store;