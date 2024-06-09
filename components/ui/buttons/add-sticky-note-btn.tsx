'use client';

//* Components
import { Button, useDisclosure } from '@nextui-org/react';
import Icon from '../texts/icon';
import AddStickyNoteModal from '@/components/modals/add-sticky-note-modal';

const AddStickyNoteBtn = ({ titleBtn }: { titleBtn?: string }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                isIconOnly={titleBtn ? false : true}
                className={`bg-primary-100 ${
                    titleBtn ? '' : 'w-auto h-auto aspect-square'
                }`}
                radius='sm'
                startContent={<Icon iconName='plus' />}
                endContent={titleBtn ? <p>{titleBtn}</p> : ''}
                onPress={onOpen}
            />

            {/* The sticky note adder modal */}
            <AddStickyNoteModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
};

export default AddStickyNoteBtn;
