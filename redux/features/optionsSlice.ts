// public
import { createSlice } from '@reduxjs/toolkit';

//* initial state
const initialState = {
    searchValue: '',
};

//* reducer
const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchValue = action.payload;
        },
    },
});

export const { setSearch } = optionsSlice.actions;
export default optionsSlice.reducer;
