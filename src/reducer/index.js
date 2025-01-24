import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import profileReducer from "../slices/profileSlice.js";
import formDataReducer from "../slices/formDataSlice.js";
// import cartReducer from "../slices/cartSlice.js"


const rootReducer = combineReducers({

        auth: authReducer,
        profile: profileReducer,
        formData: formDataReducer,
        // cart: cartReducer,


});

export default rootReducer;
