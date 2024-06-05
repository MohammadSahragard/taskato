'use client';

//* components
import { Button, Modal, useDisclosure } from '@nextui-org/react';
import Icon from '../texts/icon';
import AddStickyNoteModal from '@/components/modals/add-sticky-note-modal';

const AddStickyNoteBtn = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                isIconOnly
                className='bg-primary-100 w-auto h-auto aspect-square'
                radius='sm'
                startContent={<Icon iconName='plus' />}
                onPress={onOpen}
            />

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop='blur'
                className='bg-primary-100'
            >
                <AddStickyNoteModal />
            </Modal>
        </>
    );
};

export default AddStickyNoteBtn;
