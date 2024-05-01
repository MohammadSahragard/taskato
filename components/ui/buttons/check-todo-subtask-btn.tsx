'use client';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const CheckTodoSubtaskBtn = ({
    isCompleted,
}: {
    isCompleted?: boolean;
}) => {
    const iconName = isCompleted ? 'check-circle' : 'circle';
    const iconStyle = isCompleted ? 'fas' : 'far';
    return (
        <Button
            isIconOnly
            variant='light'
            size='sm'
            startContent={
                <Icon
                    iconName={iconName}
                    style={iconStyle}
                />
            }
        />
    );
};

export default CheckTodoSubtaskBtn;