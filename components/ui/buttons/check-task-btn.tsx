'use client';

// public
import { useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Button, Tooltip } from '@nextui-org/react';
import Icon from '../texts/icon';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';

const CheckTaskBtn = ({
    isCompleted,
    taskId,
}: {
    isCompleted?: boolean;
    taskId: string;
}) => {
    const dispatch = useDispatch();
    // states and variables
    const [isPending, startTransition] = useTransition();
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const iconName = isCompleted ? 'check-square' : 'square';
    const iconStyle = isCompleted ? 'fas' : 'far';
    const tooltipContent = isCompleted ? 'Incomplete task' : 'Complete task';

    // functions
    const changeCheck = async () => {
        // req body
        const reqBody = {
            reqData: { task_completion: !isCompleted },
            _id: taskId,
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
        <Tooltip content={tooltipContent}>
            <Button
                isIconOnly
                variant='light'
                radius='sm'
                startContent={
                    !isPending ? (
                        <Icon
                            iconName={iconName}
                            style={iconStyle}
                        />
                    ) : null
                }
                isLoading={isPending}
                onClick={() => startTransition(() => changeCheck())}
            />
        </Tooltip>
    );
};

export default CheckTaskBtn;
