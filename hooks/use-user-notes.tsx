'use client';

// public
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* redux
import { getNotesByEmail } from '@/redux/features/notesSlice';

const useUserNotes = () => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const notes = useSelector((state: any) => state.notes);
    
    useEffect(() => {
        if (userEmail) {
            dispatch(getNotesByEmail(userEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    return notes;
};

export default useUserNotes;
