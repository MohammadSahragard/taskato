'use client';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';

//* types
import { MouseEventHandler } from 'react';

const ChangeCheckSubtaskOption = ({
    isCompleted,
    changeCheck,
}: {
    isCompleted: boolean;
    changeCheck: MouseEventHandler;
}) => {
    // states and variables
    const changeCheckTitle = isCompleted
        ? 'Mark as not completed'
        : 'Mark as completed';
    const changeCheckIcon = isCompleted ? 'square' : 'square-check';

    return (
        <Chip
            className='context-menu-options'
            startContent={<Icon iconName={changeCheckIcon} />}
            onClick={changeCheck}
        >
            {changeCheckTitle}
        </Chip>
    );
};

export default ChangeCheckSubtaskOption;
