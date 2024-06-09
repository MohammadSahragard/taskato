'use client';

// Public
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Redux
import { getNotesByEmail } from '@/redux/features/notes/notesSlice';

const useUserNotes = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const notes = useAppSelector((state) => state.notes);

    // Getting the user's notes
    useEffect(() => {
        if (userEmail) {
            dispatch(getNotesByEmail(userEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    return notes;
};

export default useUserNotes;
