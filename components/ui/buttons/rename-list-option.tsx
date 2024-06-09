'use client';

//* Components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';

const RenameListOption = ({ onOpen }: { onOpen?: () => void }) => {
    return (
        <Chip
            className='context-menu-options'
            startContent={<Icon iconName='pen-to-square' />}
            onClick={onOpen}
        >
            Rename list
        </Chip>
    );
};

export default RenameListOption;
