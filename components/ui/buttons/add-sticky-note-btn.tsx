'use client';

//* components
import { Button, Modal, useDisclosure } from '@nextui-org/react';
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
