'use client';

// public
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';

const useUserTasks = () => {
    const dispatch = useAppDispatch();
    // states and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const tasks = useAppSelector((state) => state.tasks);

    useEffect(() => {
        if (userEmail) {
            dispatch(getTasksByEmail(userEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    return tasks;
};

export default useUserTasks;
