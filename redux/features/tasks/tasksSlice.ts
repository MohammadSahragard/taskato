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
const getTasksByEmail = createAsyncThunk(
    'tasks/getTasksByEmail',
    async (email: string) => {
        const res = await fetch('/api/user-tasks/tasks', {
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
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getTasksByEmail.pending, (state: GetDataTypes) => {
            state.loading = true;
            state.beforeLoading = false;
        });
        builder.addCase(
            getTasksByEmail.fulfilled,
            (state: any, action: any) => {
                state.beforeLoading = false;
                state.loading = false;
                state.data = action.payload;
                state.error = '';
            }
        );
        builder.addCase(getTasksByEmail.rejected, (state: GetDataTypes) => {
            state.beforeLoading = false;
            state.loading = false;
            state.data = [];
            state.error = 'Something went wrong. Please try again later.';
        });
    },
});

export default tasksSlice.reducer;
export { getTasksByEmail };
