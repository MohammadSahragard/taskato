'use client';

//* components
import { Button, useDisclosure } from '@nextui-org/react';
import Icon from '../texts/icon';
import AddListModal from '@/components/modals/add-list-modal';

const AddListBtn = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                radius='sm'
                variant='light'
                className='fw-btn p-3'
                onPress={onOpen}
                startContent={
                    <Icon
                        iconName='plus'
                        style='fas'
                    />
                }
            >
                Add New List
            </Button>
            <AddListModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
};

export default AddListBtn;
