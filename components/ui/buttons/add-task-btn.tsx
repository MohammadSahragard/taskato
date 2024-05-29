'use client';

// public

//* components
import { Button, Tooltip } from '@nextui-org/react';
import Icon from '../texts/icon';

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
        <Tooltip content='Add task'>
            <Button
                variant='light'
                startContent={!isPending ? <Icon iconName='plus' /> : null}
                isLoading={isPending}
                isDisabled={isPending}
                isIconOnly
                radius='sm'
                onClick={(event) => startTransition(() => submitTask(event))}
            />
        </Tooltip>
    );
};

export default AddTaskBtn;
