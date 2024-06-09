'use client';

// Public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';

//* Types
type ChangeCheckTaskTypes = {
    neededId: string;
    isCompleted?: boolean;
    completionTransition?: React.TransitionStartFunction;
};

const ChangeCheckTaskOption = ({
    neededId,
    isCompleted,
    completionTransition,
}: ChangeCheckTaskTypes) => {
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const changeCheckTitle = isCompleted
        ? 'Mark as not completed'
        : 'Mark as completed';
    const changeCheckIcon = isCompleted ? 'square' : 'square-check';

    // Functions
    const changeCheck = async () => {
        // Req body
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
            onClick={() => completionTransition?.(() => changeCheck())}
        >
            {changeCheckTitle}
        </Chip>
    );
};

export default ChangeCheckTaskOption;
