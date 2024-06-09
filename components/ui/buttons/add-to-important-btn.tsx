'use client';

// Public
import { TransitionStartFunction } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';
import TooltipElement from '../texts/tooltip-element';
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';

//* types
type AddToImportantTypes = {
    isImportant: boolean;
    taskId: string;
    isPending: boolean;
    startTransition: TransitionStartFunction;
};

const AddToImportantBtn = ({
    isImportant,
    taskId,
    isPending,
    startTransition,
}: AddToImportantTypes) => {
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const iconStyle = isImportant ? 'fas' : 'far';
    const tooltipContent = isImportant
        ? 'Remove from Important'
        : 'Add to important';

    // Functions
    const toggleImportant = async () => {
        // Req body
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
