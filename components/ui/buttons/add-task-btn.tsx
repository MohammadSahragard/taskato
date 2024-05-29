'use client';

// public

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';
import TooltipElement from '../texts/tooltip-element';

const AddTaskBtn = ({
    submitTask,
    startTransition,
    isPending,
}: {
    submitTask: any;
    startTransition: any;
    isPending: boolean;
}) => {
    return (
        <TooltipElement title='Add task'>
            <Button
                variant='light'
                startContent={!isPending ? <Icon iconName='plus' /> : null}
                isLoading={isPending}
                isDisabled={isPending}
                isIconOnly
                radius='sm'
                onClick={(event) => startTransition(() => submitTask(event))}
            />
        </TooltipElement>
    );
};

export default AddTaskBtn;
