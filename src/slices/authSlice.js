import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    signUpData: null,
    loading: false,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setSignupData(state, action) {
          
            state.signUpData = action.payload;  // Ensure payload is not null here
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setToken, setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;
 