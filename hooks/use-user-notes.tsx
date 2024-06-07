'use client';

// public
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* redux
import { getNotesByEmail } from '@/redux/features/notesSlice';

const useUserNotes = () => {
    const dispatch = useAppDispatch();
    // states and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const notes = useAppSelector((state) => state.notes);

    useEffect(() => {
        if (userEmail) {
            dispatch(getNotesByEmail(userEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    return notes;
};

export default useUserNotes;
