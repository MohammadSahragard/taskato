'use client';

//* Components
import Icon from '../texts/icon';

//* Types
type CheckSubtaskTypes = {
    isCompleted?: boolean;
    isPending?: boolean;
};

const CheckSubtaskBtn = ({ isCompleted, isPending }: CheckSubtaskTypes) => {
    const iconName = isPending ? '' : isCompleted ? 'check-square' : 'square';
    const iconStyle = isCompleted ? 'fas' : 'far';
    return (
        <Icon
            iconName={iconName}
            style={iconStyle}
        />
    );
};

export default CheckSubtaskBtn;
