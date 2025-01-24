import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload; // Corrected to use action.payload
        },
        setToken(state, action) {
            state.token = action.payload; // Add setToken reducer to store token
        },
    },
});

export const { setUsers, setToken } = profileSlice.actions;
export default profileSlice.reducer;
