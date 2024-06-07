'use client';

// public
import { useRef, useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/app/hook';

//* components
import AddStickyNoteBtn from '../ui/buttons/add-sticky-note-btn';
import StickyNoteItem from './sticky-note-item';
import EmptyStateNotes from './empty-state-notes';

//* components

const StickyNotesCon = () => {
    // refs
    const conRef = useRef<HTMLDivElement | null>(null);

    // states and variables
    const [columns, setColumns] = useState(0);
    const notes = useAppSelector((state) => state.notes);

    // functions
    const getColumn = () => {
        const widthContainer = conRef?.current?.offsetWidth ?? 0;
        const numberOfColumns = Math.round(widthContainer / 250);

        setColumns(numberOfColumns);
    };

    useEffect(() => {
        window.addEventListener('resize', getColumn);
    }, []);
    useEffect(() => {
        getColumn();
    }, [conRef]);

    return (
        <div
            className='grid gap-4'
            ref={conRef}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
            {!notes.error ? (
                notes?.data?.length ? (
                    <>
                        {notes?.data?.map((note: any) => (
                            <StickyNoteItem
                                key={note._id}
                                _id={note._id}
                                note_title={note.note_title}
                                note_content={note.note_content}
                                note_color={note.note_color}
                            />
                        ))}
                        <AddStickyNoteBtn />
                    </>
                ) : (
                    <EmptyStateNotes />
                )
            ) : (
                <p>{notes.error}</p>
            )}
        </div>
    );
};

export default StickyNotesCon;
