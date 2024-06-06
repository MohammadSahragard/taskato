// public
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//* initial state
const initialState = {
    loading: false,
    data: [],
    error: '',
};

//* async functions
const getNotesByEmail: any = createAsyncThunk(
    'notes/getNotesByEmail',
    async (email: string) => {
        const res = await fetch('/api/sticky-notes/notes', {
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
const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getNotesByEmail.pending, (state: any) => {
            state.loading = true;
        });
        builder.addCase(
            getNotesByEmail.fulfilled,
            (state: any, action: any) => {
                state.loading = false;
                state.data = action.payload;
                state.error = '';
            }
        );
        builder.addCase(getNotesByEmail.rejected, (state: any) => {
            state.loading = false;
            state.data = [];
            state.error = 'Something went wrong. Please try again later.';
        });
    },
});

export default notesSlice.reducer;
export { getNotesByEmail };
