// public
import { createSlice } from '@reduxjs/toolkit';

//* initial state
const initialState = {
    searchValue: '',
    userEmail: '',
    userName: '',
};

//* reducer
const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchValue = action.payload;
        },
        setUserEmail: (state, action) => {
            state.userEmail = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
    },
});

export const { setSearch, setUserEmail, setUserName } = optionsSlice.actions;
export default optionsSlice.reducer;
