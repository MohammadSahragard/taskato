'use client';

// public
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
            <AddStickyNoteBtn />
            <StickyNoteItem />
            {/* <EmptyStateNotes /> */}
        </div>
    );
};

export default StickyNotesCon;
