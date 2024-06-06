//* components
import Image from 'next/image';
import Subtitle from '../ui/texts/subtitle';
import Heading from '../ui/texts/heading';
import AddStickyNoteBtn from '../ui/buttons/add-sticky-note-btn';

const EmptyStateNotes = () => {
    return (
        <div className='empty-state'>
            <Image
                src='/empty-state-notes.svg'
                width='200'
                height='200'
                alt='Empty state tasks'
            />

            <Heading
                heading='You have no notes to view!'
                additionalClasses='mt-3'
            />
            <Subtitle subtitle='You can use the button below to add a note.' />
            <div className='mt-4'>
                <AddStickyNoteBtn titleBtn='Add Note' />
            </div>
        </div>
    );
};

export default EmptyStateNotes;
