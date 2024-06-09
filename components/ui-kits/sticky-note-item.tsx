'use client';

// public
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';

//* components
import { Card, CardBody, useDisclosure } from '@nextui-org/react';
import Title from '../ui/texts/title';

//* types
import { NoteDataTypes } from '@/types/types';

//* helper
import { setContextMenuData } from '@/helper/functions/functions';
import UpdateStickyNoteModal from '../modals/update-sticky-note-modal';

const StickyNoteItem = (props: NoteDataTypes) => {
    const dispatch = useAppDispatch();
    // states and variables
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const contextMenuData = useAppSelector((state) => state.contextMenu);

    // styles
    const isActiveContextMenu =
        contextMenuData.itemData.id === props._id && contextMenuData.isShownMenu
            ? 'opacity-80 scale-95'
            : '';

    // context menu data
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

            {/* modal for update note */}
            <UpdateStickyNoteModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
};

export default StickyNoteItem;
