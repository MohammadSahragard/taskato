'use client';

// public
import { TaskContentTypes } from '@/types/types';

//* types
import { createSlice } from '@reduxjs/toolkit';

//* initial state
const initialState: TaskContentTypes = {
    task_title: '',
    task_description: '',
    task_list: {
        list_title: '',
        list_color: '',
    },
    task_due_date: undefined,
    task_reminder_date: {
        time: {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
        },
        date: new Date(),
        isTrueReminder: false,
    }
};

//* reducer
const taskDataSlice = createSlice({
    name: 'taskData',
    initialState,
    reducers: {
        setTaskTitle: (state, action) => {
            state.task_title = action.payload;
        },
        setTaskDescription: (state, action) => {
            state.task_description = action.payload;
        },
        setSelectedList: (state, action) => {
            state.task_list = {
                list_title: action.payload.title,
                list_color: action.payload.color,
            };
        },
        setTaskDate: (state, action) => {
            state.task_due_date = action.payload;
        },
        setTaskReminder: (state, action) => {
            state.task_reminder_date = action.payload;
        },
        setShowReminder: (state, action) => {
            state.task_reminder_date.isTrueReminder = action.payload;
        },
        setClearFields: (state) => {
            state.task_title = '';
            state.task_description = '';
            state.task_list = {
                list_title: '',
                list_color: '',
            };
            state.task_due_date = undefined;
            state.task_reminder_date = {
                time: {
                    hour: new Date().getHours(),
                    minute: new Date().getMinutes(),
                },
                date: new Date(),
                isTrueReminder: false,
            };
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
    setClearFields,
} = taskDataSlice.actions;
export default taskDataSlice.reducer;
