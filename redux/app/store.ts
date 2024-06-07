// public
import { configureStore } from '@reduxjs/toolkit';

//* reducers
import optionsSlice from '../features/optionsSlice';
import todoSlice from '../features/todoSlice';
import formSlice from '../features/formSlice';
import taskListsSlice from '../features/taskListsSlice';
import tasksSlice from '../features/tasksSlice';
import selectedTaskSlice from '../features/selectedTaskSlice';
import notesSlice from '../features/notesSlice';
import contextMenuSlice from '../features/contextMenuSlice';

const store = configureStore({
    reducer: {
        options: optionsSlice,
        taskData: todoSlice,
        formValues: formSlice,
        taskLists: taskListsSlice,
        tasks: tasksSlice,
        notes: notesSlice,
        selectedTask: selectedTaskSlice,
        contextMenu: contextMenuSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
