// Types
import { NoteDataTypes } from '@/types/types';

//* Adding a note
export const addNote = async (taskData: NoteDataTypes, userEmail: string) => {
    // Variables
    const { note_title, note_content, note_color } = taskData;

    // Form validation
    if (!note_title) {
        return {
            message: 'Please enter a note title!',
            status: 401,
        };
    }

    if (!note_content) {
        return {
            message: 'Please enter the content of your note!',
            status: 401,
        };
    }

    // Req data
    const reqData: NoteDataTypes = {
        note_title,
        note_content,
        note_color,
    };

    // Post data
    const res = await fetch('/api/sticky-notes/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reqData, userEmail }),
    });
    const data = await res.json();

    return data;
};

//* Updating a task
export const updateNote = async (noteData: NoteDataTypes) => {
    // Variables
    const { _id, note_title, note_content, note_color } = noteData;

    // Req data
    const reqData: NoteDataTypes = {
        _id,
        note_title,
        note_content,
        note_color,
    };

    // Form validation
    if (!reqData.note_title) {
        return {
            message: 'Please enter a note title!',
            status: 401,
        };
    }

    if (!reqData.note_content) {
        return {
            message: 'Please enter the content of your note!',
            status: 401,
        };
    }

    // Put data
    const res = await fetch('/api/sticky-notes/note', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, reqData }),
    });
    const data = await res.json();

    return data;
};
