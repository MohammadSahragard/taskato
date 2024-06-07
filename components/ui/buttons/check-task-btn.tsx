'use client';

// public
import { TransitionStartFunction, useTransition } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';
import TooltipElement from '../texts/tooltip-element';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';

const CheckTaskBtn = ({
    isCompleted,
    taskId,
    isPending,
    startTransition,
}: {
    isCompleted: boolean;
    taskId: string;
    isPending: boolean;
    startTransition: TransitionStartFunction;
}) => {
    const dispatch = useAppDispatch();
    // states and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
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
        <TooltipElement title={tooltipContent}>
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
        </TooltipElement>
    );
};

export default CheckTaskBtn;
