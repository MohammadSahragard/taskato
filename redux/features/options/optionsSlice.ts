// Public
import { createSlice } from '@reduxjs/toolkit';

//* Initial state
const initialState = {
    searchValue: '',
    userEmail: '',
    userName: '',
    userLoading: true,
    isOpenedDetailsSidebar: false,
    // Responsive options
    isOpenedMobileDetailsSidebar: false,
    isOpenedMobileMenu: false,
};

//* Reducer
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
        // Responsive options
        setIsOpenedMobileDetailsSidebar: (state, action) => {
            state.isOpenedMobileDetailsSidebar = action.payload;
        },
        setIsOpenedMobileMenu: (state, action) => {
            state.isOpenedMobileMenu = action.payload;
        },
    },
});

export const {
    setSearch,
    setUserEmail,
    setUserName,
    setUserLoading,
    setIsOpenedDetailsSidebar,
    setIsOpenedMobileDetailsSidebar,
    setIsOpenedMobileMenu,
} = optionsSlice.actions;
export default optionsSlice.reducer;
