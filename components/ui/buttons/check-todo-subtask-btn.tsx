'use client';

//* components
import Icon from '../texts/icon';

const CheckTodoSubtaskBtn = ({ isCompleted }: { isCompleted?: boolean }) => {
    const iconName = isCompleted ? 'check-square' : 'square';
    const iconStyle = isCompleted ? 'fas' : 'far';
    return (
        <Icon
            iconName={iconName}
            style={iconStyle}
        />
    );
};

export default CheckTodoSubtaskBtn;
