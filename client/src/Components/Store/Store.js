import { configureStore } from "@reduxjs/toolkit";
import StateSlice from "./Slices/StateSlice";

const store = configureStore({
    reducer : {
        openPopup : StateSlice.reducer
    }
})
export default store;