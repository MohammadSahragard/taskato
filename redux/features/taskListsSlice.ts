// public
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//* initial state
const initialState = {
    beforeLoading: true,
    loading: false,
    data: [],
    error: '',
};

//* async functions
const getListsByEmail: any = createAsyncThunk(
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

//* reducer
const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getListsByEmail.pending, (state) => {
            state.loading = true;
            state.beforeLoading = false;
        });
        builder.addCase(
            getListsByEmail.fulfilled,
            (state: any, action: any) => {
                state.beforeLoading = false;
                state.loading = false;
                state.data = action.payload;
                state.error = '';
            }
        );
        builder.addCase(getListsByEmail.rejected, (state) => {
            state.beforeLoading = false;
            state.loading = false;
            state.data = [];
            state.error = 'Something went wrong. Please try again later.';
        });
    },
});

export default taskListsSlice.reducer;
export { getListsByEmail };
