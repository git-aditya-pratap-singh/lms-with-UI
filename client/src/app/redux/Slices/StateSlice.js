import { createSlice } from "@reduxjs/toolkit";

const StateSlice = createSlice({
    name : "stateData",
    initialState : {
        open_login : false,
        open_registration : false,
        img_update_popup : false,
        userLoginPopup_state: false,
        registrationOTPpopup: false,
        registrationData: '',
        add_student_popup : {
            add : false,
            edit : false, 
            item: ''
        },
        add_teacher_popup : {
            add : false,
            edit : false,
            item : ''
        },
        otp_popup_state: {
            otpLogin: false,
            forgetPswdOtp: false
        },  
    },
    reducers : {
        login_popup: (state, action)=>{
            state.open_login = action.payload;
        },
        registration_popup: (state, action)=>{
            state.open_registration = action.payload;
        },
        registration_otp_popup: (state, action)=>{
            state.registrationOTPpopup = action.payload;
        },
        registration_Data: (state, action)=>{
            state.registrationData = action.payload;
        },
        img_update_popup: (state, action)=>{
            state.img_update_popup = action.payload;
        },
        add_student_popup: (state, action)=>{ 
            state.add_student_popup[action.payload.key === 'add' ? 'add' : 'edit'] = action.payload.check;
            state.add_student_popup.item = action.payload.item;
        },
        add_teacher_popup: (state, action)=>{
            state.add_teacher_popup[action.payload.key === 'add' ? 'add' : 'edit'] = action.payload.check;
            state.add_teacher_popup.item = action.payload.item;
        },
        otp_popup: (state, action)=>{
            state.otp_popup_state[action.payload.key === 'otpLogin' ? 'otpLogin' : 'forgetPswdOtp'] = action.payload.check;
        },
        user_login_popup: (state, action)=>{
            state.userLoginPopup_state = action.payload;
        }  
    }
})

export default StateSlice;
export const {login_popup, registration_popup, img_update_popup, add_student_popup, add_teacher_popup, 
    otp_popup, user_login_popup, registration_otp_popup, registration_Data} = StateSlice.actions;