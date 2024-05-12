'use client';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const CheckTodoBtn = ({
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
            radius='sm'
            startContent={
                <Icon
                    iconName={iconName}
                    style={iconStyle}
                />
            }
        />
    );
};

export default CheckTodoBtn;
