'use client';

// Public
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';

//* Components
import { Card, CardBody, useDisclosure } from '@nextui-org/react';
import Title from '../ui/texts/title';

//* Types
import { NoteDataTypes } from '@/types/types';

//* Functions
import { setContextMenuData } from '@/helper/functions/functions';
import UpdateStickyNoteModal from '../modals/update-sticky-note-modal';

const StickyNoteItem = (props: NoteDataTypes) => {
    const dispatch = useAppDispatch();
    // States and variables
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const contextMenuData = useAppSelector((state) => state.contextMenu);

    // Classes
    const isActiveContextMenu =
        contextMenuData.itemData.id === props._id && contextMenuData.isShownMenu
            ? 'opacity-80 scale-95'
            : '';

    // Context menu data
    const data = {
        id: props._id,
        title: props.note_title,
        content: props.note_content,
        onOpen,
    };

    return (
        <>
            <Card
                className={`sticky-note ${isActiveContextMenu}`}
                radius='sm'
                style={{ backgroundColor: props.note_color }}
                onContextMenu={(event: any) =>
                    setContextMenuData(event, 'notes', data, dispatch)
                }
            >
                <CardBody>
                    <Title
                        title={props.note_title}
                        additionalClasses='text-white mb-2'
                    />
                    <p className='text-white/70 text-sm'>
                        {props.note_content}
                    </p>
                </CardBody>
            </Card>

            {/* The modal of updating a note */}
            <UpdateStickyNoteModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
};

export default StickyNoteItem;
