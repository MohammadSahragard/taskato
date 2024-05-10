// public
import { createSlice } from '@reduxjs/toolkit';

//* initial state
const initialState = {
    searchValue: '',
    userEmail: '',
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
    },
});

export const { setSearch, setUserEmail } = optionsSlice.actions;
export default optionsSlice.reducer;
