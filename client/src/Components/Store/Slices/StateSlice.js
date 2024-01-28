import { createSlice } from "@reduxjs/toolkit";

const StateSlice = createSlice({
    name : "stateData",
    initialState : {
        open_login : false
    },
    reducers : {
        login_popup : (state, action)=>{
            state.open_login = action.payload;
        }
    }
})

export default StateSlice;
export const {login_popup} = StateSlice.actions;