'use client';

// Public
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Redux
import { getListsByEmail } from '@/redux/features/lists/listsSlice';

const useUserLists = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const taskLists = useAppSelector((state) => state.taskLists);

    // Getting the user's task lists
    useEffect(() => {
        if (userEmail) {
            dispatch(getListsByEmail(userEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    return taskLists;
};

export default useUserLists;
