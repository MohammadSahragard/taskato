// public
import { configureStore } from '@reduxjs/toolkit';

//* reducers
import optionsSlice from '../features/optionsSlice';
import todoSlice from '../features/todoSlice';

const store = configureStore({
    reducer: {
        options: optionsSlice,
        todoContent: todoSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store;