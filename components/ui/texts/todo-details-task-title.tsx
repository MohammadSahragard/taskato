//* components
import { Input } from '@nextui-org/react';

const TodoDetailsTaskTitle = () => {
    return (
        <Input
            value='Task title'
            variant='bordered'
            radius='sm'
            classNames={{
                inputWrapper:
                    'shadow-none border-2 dark:border-opacity-40',
            }}
        />
    );
};

export default TodoDetailsTaskTitle;
