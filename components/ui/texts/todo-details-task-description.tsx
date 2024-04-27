//* components
import { Textarea } from '@nextui-org/react';

const TodoDetailsTaskDescription = () => {
    return (
        <Textarea
            label='Description'
            variant='bordered'
            radius='sm'
            size='sm'
            minRows={5}
            classNames={{
                inputWrapper: 'shadow-none border-2 dark:border-opacity-40',
            }}
        />
    );
};

export default TodoDetailsTaskDescription;
