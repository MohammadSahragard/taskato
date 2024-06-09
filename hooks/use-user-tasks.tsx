'use client';

// Public
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Redux
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';

const useUserTasks = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const tasks = useAppSelector((state) => state.tasks);

    // Getting the user's tasks
    useEffect(() => {
        if (userEmail) {
            dispatch(getTasksByEmail(userEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    return tasks;
};

export default useUserTasks;
