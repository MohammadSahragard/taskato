// public
import { createSlice } from '@reduxjs/toolkit';

// types
import { TaskContentTypes } from '@/types/types';

//* initial state
const initialState: TaskContentTypes = {
    _id: '',
    email: '',
    task_title: '',
    task_description: '',
    task_due_date: undefined,
    task_list: {
        list_title: '',
        list_color: '',
    },
    task_reminder_date: {
        time: {
            hour: 0,
            minute: 0,
        },
        date: undefined,
        isTrueReminder: false,
    },
    subtasks: [],
    task_complete: false,
    is_in_important: false,
    createdAt: undefined,
};

//* reducer
const selectedTaskSlice = createSlice({
    name: 'selectedTask',
    initialState,
    reducers: {
        updateSelectedTask: (state, action) => {
            // variables
            const id = action.payload._id;
            const email = action.payload.email;
            const title = action.payload.task_title;
            const description: any = action.payload.task_description || '';
            const due_date: any = action?.payload?.task_due_date || null;
            const list: any = action?.payload?.task_list || {
                list_title: '',
                list_color: '',
            };
            const reminder_date: any = {
                time: action?.payload?.task_reminder_date?.time ?? {
                    hour: 0,
                    minute: 0,
                },
                date:
                    new Date(action?.payload?.task_reminder_date?.date) ?? null,
                isTrueReminder:
                    action?.payload?.task_reminder_date?.isTrueReminder ??
                    false,
            };
            const subtasks = action.payload.subtasks || [];

            // update states
            state._id = id;
            state.email = email;
            state.task_title = title;
            state.task_description = description ? description : '';
            state.task_due_date = due_date;
            state.task_list = list;
            state.task_reminder_date = reminder_date;
            state.subtasks = subtasks;
            state.task_complete = action.payload.task_complete;
            state.is_in_important = action.payload.is_in_important;
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
        updateSubtasks: (state, action) => {
            state.subtasks = action.payload;
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
    updateSubtasks,
} = selectedTaskSlice.actions;
export default selectedTaskSlice.reducer;
