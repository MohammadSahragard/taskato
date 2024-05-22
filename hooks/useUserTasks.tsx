'use client';

// public
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';

const useUserLists = () => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const tasks = useSelector((state: any) => state.tasks);
    
    useEffect(() => {
        if (userEmail) {
            dispatch(getTasksByEmail(userEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    return tasks;
};

export default useUserLists;
