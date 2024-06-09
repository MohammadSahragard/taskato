'use client';

// Public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Textarea } from '@nextui-org/react';

//* Redux
import { setTaskDescription } from '@/redux/features/selected-task/selectedTaskSlice';

const TaskDetailsDescription = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const description = useAppSelector(
        (state) => state.selectedTask.task_description
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
