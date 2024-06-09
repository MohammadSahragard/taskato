// Public
import { createSlice } from '@reduxjs/toolkit';

// Types
import { SignupSubmitTypes } from '@/types/types';

//* Initial state
const initialState: SignupSubmitTypes = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

//* Reducers
const formSlice = createSlice({
    name: 'form-slice',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
        setClearFields: (state) => {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.password = '';
            state.confirmPassword = '';
        },
    },
});

export const {
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setClearFields,
} = formSlice.actions;
export default formSlice.reducer;
