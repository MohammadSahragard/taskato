// public
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//* initial state
const initialState = {
    loading: false,
    data: [],
    error: '',
};

//* async functions
const getTasksByEmail: any = createAsyncThunk(
    'lists/getTasksByEmail',
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

//* reducer
const tasksSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getTasksByEmail.pending, (state: any) => {
            state.loading = true;
        });
        builder.addCase(
            getTasksByEmail.fulfilled,
            (state: any, action: any) => {
                state.loading = false;
                state.data = action.payload;
                state.error = '';
            }
        );
        builder.addCase(getTasksByEmail.rejected, (state: any) => {
            state.loading = false;
            state.data = [];
            state.error = 'Something went wrong. Please try again later.';
        });
    },
});

export default tasksSlice.reducer;
export { getTasksByEmail };
