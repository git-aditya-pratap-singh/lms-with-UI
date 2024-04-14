import { createSlice } from "@reduxjs/toolkit";

const StateSlice = createSlice({
    name : "stateData",
    initialState : {
        open_login : false,
        open_registration : false,
        img_update_popup : false
    },
    reducers : {
        login_popup : (state, action)=>{
            state.open_login = action.payload;
        },
        registration_popup : (state, action)=>{
            state.open_registration = action.payload;
        },
        img_update_popup : (state,action)=>{
            state.img_update_popup = action.payload;
        }
    }
})

export default StateSlice;
export const {login_popup, registration_popup, img_update_popup} = StateSlice.actions;