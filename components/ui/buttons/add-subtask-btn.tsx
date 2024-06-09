'use client';

//* Components
import { Button, useDisclosure } from '@nextui-org/react';
import Icon from '../texts/icon';
import AddSubtaskModal from '@/components/modals/add-subtask-modal';

const AddSubtaskBtn = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                className='task-details-btn'
                variant='bordered'
                fullWidth
                onPress={onOpen}
                radius='sm'
                startContent={<Icon iconName='plus' />}
            >
                Add new subtask
            </Button>

            {/* The subtask adder modal */}
            <AddSubtaskModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
};

export default AddSubtaskBtn;
