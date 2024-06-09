// Public
import { configureStore } from '@reduxjs/toolkit';

//* Reducers
import optionsSlice from '../features/options/optionsSlice';
import taskDataSlice from '../features/task-data/taskDataSlice';
import formSlice from '../features/form/formSlice';
import listsSlice from '../features/lists/listsSlice';
import tasksSlice from '../features/tasks/tasksSlice';
import selectedTaskSlice from '../features/selected-task/selectedTaskSlice';
import notesSlice from '../features/notes/notesSlice';
import contextMenuSlice from '../features/context-menu/contextMenuSlice';

const store = configureStore({
    reducer: {
        options: optionsSlice,
        taskData: taskDataSlice,
        formValues: formSlice,
        taskLists: listsSlice,
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
