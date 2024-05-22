'use client';

// public

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const AddTodoBtn = ({
    submitTask,
    isPending,
}: {
    submitTask: any;
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
            onClick={submitTask}
        />
    );
};

export default AddTodoBtn;
