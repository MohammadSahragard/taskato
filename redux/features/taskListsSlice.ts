// public
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//* initial state
const initialState = {
    loading: false,
    data: [],
    error: '',
};

//* async functions
const getListsByEmail: any = createAsyncThunk(
    'lists/getListsByEmailByEmail',
    async (email: string) => {
        const res = await fetch('/api/task-lists/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        return data?.data ?? 'Not found';
    }
);

//* reducer
const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getListsByEmail.pending, (state: any) => {
            state.loading = true;
        });
        builder.addCase(
            getListsByEmail.fulfilled,
            (state: any, action: any) => {
                state.loading = false;
                state.data = action.payload;
                state.error = '';
            }
        );
        builder.addCase(getListsByEmail.rejected, (state: any) => {
            state.loading = false;
            state.data = [];
            state.error = 'Something went wrong. Please try again later.';
        });
    },
});

export default taskListsSlice.reducer;
export { getListsByEmail };
