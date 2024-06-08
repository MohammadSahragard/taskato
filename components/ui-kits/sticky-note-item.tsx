//* components
import { Card, CardBody } from '@nextui-org/react';
import Title from '../ui/texts/title';

//* types
import { NoteDataTypes } from '@/types/types';

const StickyNoteItem = (props: NoteDataTypes) => {
    return (
        <Card
            className='sticky-note'
            radius='sm'
            style={{ backgroundColor: props.note_color }}
        >
            <CardBody>
                <Title
                    title={props.note_title}
                    additionalClasses='text-white mb-2'
                />
                <p className='text-white/70 text-sm'>{props.note_content}</p>
            </CardBody>
        </Card>
    );
};

export default StickyNoteItem;
