// public
import { createSlice } from '@reduxjs/toolkit';

//* types
import { selectedTaskTypes } from '@/types/types';

//* initial state
const initialState: selectedTaskTypes = {
    _id: '',
    email: '',
    task_title: '',
    task_description: '',
    task_due_date: null,
    task_list: {
        list_title: '',
        list_color: '',
    },
    task_reminder_date: {
        time: {
            hour: 0,
            minute: 0,
        },
        date: null,
        isTrueReminder: false,
    },
    task_complete: false,
    is_in_favorite: false,
    createdAt: null,
};

//* reducer
const selectedTaskSlice = createSlice({
    name: 'selectedTask',
    initialState,
    reducers: {
        updateSelectedTask: (state, action) => {
            console.log('action: ', action.payload);
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.task_title = action.payload.task_title;
            state.task_description &&
                (state.task_description = action.payload.task_description);
            state.task_due_date &&
                (state.task_due_date = action.payload.task_due_date);
            state.task_list && (state.task_list = action.payload.task_list);
            state.task_reminder_date &&
                (state.task_reminder_date = action.payload.task_reminder_date);
            state.task_complete &&
                (state.task_complete = action.payload.task_complete);
            state.is_in_favorite = action.payload.is_in_favorite;
            state.createdAt = action.payload.createdAt;
        },
        setTaskTitle: (state, action) => {
            state.task_title = action.payload;
        },
        setTaskDescription: (state, action) => {
            state.task_description = action.payload;
        },
        setTaskDueDate: (state, action) => {
            state.task_due_date = action.payload;
        },
        setTaskSelectedList: (state, action) => {
            state.task_list = action.payload;
        },
        setTaskReminderDate: (state, action) => {
            state.task_reminder_date = action.payload;
        },
        setTaskComplete: (state, action) => {
            state.task_complete = action.payload;
        },
    },
});

export const {
    updateSelectedTask,
    setTaskTitle,
    setTaskDescription,
    setTaskDueDate,
    setTaskSelectedList,
    setTaskReminderDate,
    setTaskComplete,
} = selectedTaskSlice.actions;
export default selectedTaskSlice.reducer;
