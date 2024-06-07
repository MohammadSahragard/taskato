'use client';

// public
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* redux
import { getListsByEmail } from '@/redux/features/taskListsSlice';

const useUserLists = () => {
    const dispatch = useAppDispatch();
    // states and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const taskLists = useAppSelector((state) => state.taskLists);

    useEffect(() => {
        if (userEmail) {
            dispatch(getListsByEmail(userEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    return taskLists;
};

export default useUserLists;
