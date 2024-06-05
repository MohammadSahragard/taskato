'use client';

// public
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Textarea } from '@nextui-org/react';

//* redux
import { setTaskDescription } from '@/redux/features/selectedTaskSlice';
const TaskDetailsDescription = () => {
    const dispatch = useDispatch();
    // states and variables
    const description = useSelector(
        (state: any) => state.selectedTask.task_description
    );

    return (
        <Textarea
            label='Description'
            value={description ?? null}
            placeholder='Enter your description'
            variant='bordered'
            radius='sm'
            size='sm'
            minRows={5}
            classNames={{
                inputWrapper: 'shadow-none border-2 dark:border-opacity-40',
            }}
            onChange={({ target }) =>
                dispatch(setTaskDescription(target.value))
            }
        />
    );
};

export default TaskDetailsDescription;
