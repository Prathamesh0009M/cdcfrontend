import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    editData: false,
    formData: null,
};

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        setFormData(state, action) {
            state.formData = action.payload;
        },
        
    },
});

export const { setFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
