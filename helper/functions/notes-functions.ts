import { NoteDataTypes } from '@/types/types';

//* add note
export const addNote = async (taskData: NoteDataTypes, userEmail: string) => {
    // data
    const { note_title, note_content, note_color } = taskData;

    // form validation
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

    // req data
    const reqData: NoteDataTypes = {
        note_title,
        note_content,
        note_color,
    };

    // post data
    const res = await fetch('/api/sticky-notes/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reqData, userEmail }),
    });
    const data = await res.json();

    return data;
};

//* update task
export const updateNote = async (noteData: NoteDataTypes) => {
    // data
    const { _id, note_title, note_content, note_color } = noteData;

    // req data
    const reqData: NoteDataTypes = {
        _id,
        note_title,
        note_content,
        note_color,
    };

    // form validation
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

    // put data
    const res = await fetch('/api/sticky-notes/note', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id, reqData }),
    });
    const data = await res.json();

    return data;
};
