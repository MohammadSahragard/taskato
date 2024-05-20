'use client';

// public
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* redux
import { getListsByEmail } from '@/redux/features/taskListsSlice';

const useUserLists = () => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const taskLists = useSelector((state: any) => state.taskLists);
    
    useEffect(() => {
        if (userEmail) {
            dispatch(getListsByEmail(userEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    return taskLists;
};

export default useUserLists;
