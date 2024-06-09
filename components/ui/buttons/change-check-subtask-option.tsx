'use client';

//* Components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';

//* Types
type ChangeCheckSubtaskTypes = {
    isCompleted?: boolean;
    changeCheck?: React.MouseEventHandler;
};

const ChangeCheckSubtaskOption = ({
    isCompleted,
    changeCheck,
}: ChangeCheckSubtaskTypes) => {
    // States and variables
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
