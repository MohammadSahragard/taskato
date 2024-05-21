'use client';

// public
import { TodoContent } from '@/types/types';

//* types
import { createSlice } from '@reduxjs/toolkit';

//* initial state
const initialState: TodoContent = {
    taskTitle: '',
    taskDescription: '',
    taskList: '',
    taskDate: null,
    taskReminder: {
        time: {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
        },
        date: new Date(),
        isTrueReminder: false,
    },
    taskSubtasks: [],
};

//* reducer
const todoSlice = createSlice({
    name: 'taskData',
    initialState,
    reducers: {
        setTaskTitle: (state, action) => {
            state.taskTitle = action.payload;
        },
        setTaskDescription: (state, action) => {
            state.taskDescription = action.payload;
        },
        setSelectedList: (state, action) => {
            state.taskList = action.payload;
        },
        setTaskDate: (state, action) => {
            state.taskDate = action.payload;
        },
        setTaskReminder: (state, action) => {
            state.taskReminder = action.payload;
        },
        setShowReminder: (state, action) => {
            state.taskReminder.isTrueReminder = action.payload;
        },
        setTaskSubtasks: (state, action) => {
            state.taskSubtasks.push(action.payload);
        },
    },
});

export const {
    setTaskTitle,
    setTaskDescription,
    setSelectedList,
    setTaskDate,
    setTaskReminder,
    setShowReminder,
    setTaskSubtasks,
} = todoSlice.actions;
export default todoSlice.reducer;
