'use client';

// public
import { TodoContent } from '@/types/types';

//* types
import { createSlice } from '@reduxjs/toolkit';

//* initial state
const initialState: TodoContent = {
    todoText: '',
    todoList: '',
    todoDate: null,
    todoReminder: {
        time: {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
        },
        date: new Date(),
        isTrueReminder: false,
    },
};

//* reducer
const todoSlice = createSlice({
    name: 'todoContent',
    initialState,
    reducers: {
        setTodoText: (state, action) => {
            state.todoText = action.payload;
        },
        setSelectedList: (state, action) => {
            state.todoList = action.payload;
        },
        setTodoDate: (state, action) => {
            state.todoDate = action.payload;
        },
        setTodoReminder: (state, action) => {
            state.todoReminder = action.payload;
        },
        setShowReminder: (state, action) => {
            state.todoReminder.isTrueReminder = action.payload;
        },
    },
});

export const {
    setTodoText,
    setSelectedList,
    setTodoDate,
    setTodoReminder,
    setShowReminder,
} = todoSlice.actions;
export default todoSlice.reducer;
