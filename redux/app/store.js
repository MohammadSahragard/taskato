// public
import { configureStore } from '@reduxjs/toolkit';

//* reducers
import optionsSlice from '../features/optionsSlice';
import todoSlice from '../features/todoSlice';
import formSlice from '../features/formSlice';
import taskListsSlice from '../features/taskListsSlice';
import tasksSlice from '../features/tasksSlice';

const store = configureStore({
    reducer: {
        options: optionsSlice,
        taskData: todoSlice,
        formValues: formSlice,
        taskLists: taskListsSlice,
        tasks: tasksSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store;