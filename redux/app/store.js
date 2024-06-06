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

const store = configureStore({
    reducer: {
        options: optionsSlice,
        taskData: todoSlice,
        formValues: formSlice,
        taskLists: taskListsSlice,
        tasks: tasksSlice,
        notes: notesSlice,
        selectedTask: selectedTaskSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store;