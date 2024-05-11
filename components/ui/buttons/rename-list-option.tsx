'use client';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';

const RenameListOption = ({ onOpenModal }: { onOpenModal: any }) => {
    return (
        <>
            <Chip
                className='bg-transparent !min-h-8 !min-w-full p-2'
                startContent={<Icon iconName='pen-to-square' />}
                onClick={onOpenModal}
            >
                Rename list
            </Chip>
        </>
    );
};

export default RenameListOption;
