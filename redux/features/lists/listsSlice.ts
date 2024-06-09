// Public
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Types
import { GetDataTypes } from '@/types/types';

//* Initial state
const initialState: GetDataTypes = {
    beforeLoading: true,
    loading: false,
    data: [],
    error: '',
};

//* Async functions
const getListsByEmail = createAsyncThunk(
    'lists/getListsByEmail',
    async (email: string) => {
        const res = await fetch('/api/task-lists/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        return data?.data;
    }
);

//* Reducer
const listsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getListsByEmail.pending, (state: GetDataTypes) => {
            state.loading = true;
            state.beforeLoading = false;
        });
        builder.addCase(
            getListsByEmail.fulfilled,
            (state: GetDataTypes, action: any) => {
                state.beforeLoading = false;
                state.loading = false;
                state.data = action.payload;
                state.error = '';
            }
        );
        builder.addCase(getListsByEmail.rejected, (state: GetDataTypes) => {
            state.beforeLoading = false;
            state.loading = false;
            state.data = [];
            state.error = 'Something went wrong. Please try again later.';
        });
    },
});

export default listsSlice.reducer;
export { getListsByEmail };
