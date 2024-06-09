'use client';

//* Components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';

const UpdateNoteOption = ({ onOpen }: { onOpen?: () => void }) => {
    return (
        <Chip
            className='context-menu-options'
            startContent={<Icon iconName='pen-to-square' />}
            onClick={onOpen}
        >
            Update note
        </Chip>
    );
};

export default UpdateNoteOption;
