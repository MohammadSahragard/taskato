'use client';

// public

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const AddTodoBtn = ({
    submitTask,
    startTransition,
    isPending,
}: {
    submitTask: any;
    startTransition: any;
    isPending: boolean;
}) => {
    return (
        <Button
            variant='light'
            startContent={!isPending ? <Icon iconName='plus' /> : null}
            isLoading={isPending}
            isDisabled={isPending}
            isIconOnly
            radius='sm'
            onClick={(event) => startTransition(() => submitTask(event))}
        />
    );
};

export default AddTodoBtn;
