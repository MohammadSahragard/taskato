// public
import { createSlice } from '@reduxjs/toolkit';

//* initial state
const initialState = {
    searchValue: '',
    userEmail: '',
    userName: '',
    userLoading: true,
    isOpenedDetailsSidebar: false,
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
        setUserLoading: (state) => {
            state.userLoading = false;
        },
        setIsOpenedDetailsSidebar: (state, action) => {
            state.isOpenedDetailsSidebar = action.payload;
        },
    },
});

export const {
    setSearch,
    setUserEmail,
    setUserName,
    setUserLoading,
    setIsOpenedDetailsSidebar,
} = optionsSlice.actions;
export default optionsSlice.reducer;
