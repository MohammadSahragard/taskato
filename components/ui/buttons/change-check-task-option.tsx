'use client';

// public
import { useDispatch, useSelector } from 'react-redux';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { getTasksByEmail } from '@/redux/features/tasksSlice';

//* types
import { TransitionStartFunction } from 'react';

const ChangeCheckTaskOption = ({
    neededId,
    isCompleted,
    completionTransition,
}: {
    neededId: string;
    isCompleted: boolean;
    completionTransition: TransitionStartFunction;
}) => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const changeCheckTitle = isCompleted
        ? 'Mark as not completed'
        : 'Mark as completed';
    const changeCheckIcon = isCompleted ? 'square' : 'square-check';

    // functions
    const changeCheck = async () => {
        // req body
        const reqBody = {
            reqData: { task_completion: !isCompleted },
            _id: neededId,
        };

        const req = await fetch('/api/user-tasks/task', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });
        const res = await req.json();
        if (res.status === 200) {
            dispatch(getTasksByEmail(userEmail));
        }
    };

    return (
        <Chip
            className='context-menu-options'
            startContent={<Icon iconName={changeCheckIcon} />}
            onClick={() => completionTransition(() => changeCheck())}
        >
            {changeCheckTitle}
        </Chip>
    );
};

export default ChangeCheckTaskOption;
