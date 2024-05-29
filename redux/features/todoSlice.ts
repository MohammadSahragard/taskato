'use client';

// public
import { TaskContent } from '@/types/types';

//* types
import { createSlice } from '@reduxjs/toolkit';

//* initial state
const initialState: TaskContent = {
    taskTitle: '',
    taskDescription: '',
    taskList: {
        list_title: '',
        list_color: '',
    },
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
            state.taskList = {
                list_title: action.payload.title,
                list_color: action.payload.color,
            };
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
        setClearFields: (state) => {
            state.taskTitle = '';
            state.taskDescription = '';
            state.taskList = {
                list_title: '',
                list_color: '',
            };
            state.taskDate = null;
            state.taskReminder = {
                time: {
                    hour: new Date().getHours(),
                    minute: new Date().getMinutes(),
                },
                date: new Date(),
                isTrueReminder: false,
            };
            state.taskSubtasks = [];
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
    setClearFields,
} = todoSlice.actions;
export default todoSlice.reducer;
