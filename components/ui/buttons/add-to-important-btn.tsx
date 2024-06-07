'use client';

// public
import { TransitionStartFunction, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';
import TooltipElement from '../texts/tooltip-element';
import { getTasksByEmail } from '@/redux/features/tasksSlice';

const AddToImportantBtn = ({
    isImportant,
    taskId,
    isPending,
    startTransition,
}: {
    isImportant: boolean;
    taskId: string;
    isPending: boolean;
    startTransition: TransitionStartFunction;
}) => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const iconStyle = isImportant ? 'fas' : 'far';
    const tooltipContent = isImportant
        ? 'Remove from Important'
        : 'Add to important';

    // functions
    const toggleImportant = async () => {
        // req body
        const reqBody = {
            reqData: { is_in_important: !isImportant },
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
                startContent={
                    !isPending ? (
                        <Icon
                            iconName='star'
                            style={iconStyle}
                        />
                    ) : null
                }
                isIconOnly
                radius='sm'
                variant='light'
                isLoading={isPending}
                onClick={() => startTransition(() => toggleImportant())}
            />
        </TooltipElement>
    );
};

export default AddToImportantBtn;
