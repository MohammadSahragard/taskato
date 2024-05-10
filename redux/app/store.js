// public
import { configureStore } from '@reduxjs/toolkit';

//* reducers
import optionsSlice from '../features/optionsSlice';
import todoSlice from '../features/todoSlice';
import formSlice from '../features/formSlice';
import taskListsSlice from '../features/taskListsSlice';

const store = configureStore({
    reducer: {
        options: optionsSlice,
        todoContent: todoSlice,
        formValues: formSlice,
        taskLists: taskListsSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store;