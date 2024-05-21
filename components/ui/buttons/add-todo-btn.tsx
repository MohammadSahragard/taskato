'use client';

// public

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const AddTodoBtn = ({ submitTask }: { submitTask: any }) => {
    return (
        <Button
            variant='light'
            startContent={<Icon iconName='plus' />}
            isIconOnly
            radius='sm'
            onClick={submitTask}
        />
    );
};

export default AddTodoBtn;
