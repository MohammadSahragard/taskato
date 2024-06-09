'use client';

// Public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Input } from '@nextui-org/react';

//* Redux
import { setTaskTitle } from '@/redux/features/selected-task/selectedTaskSlice';

const TaskDetailsTaskTitle = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const taskTitle = useAppSelector((state) => state.selectedTask.task_title);

    return (
        <Input
            value={taskTitle ?? null}
            placeholder='Task title'
            variant='bordered'
            radius='sm'
            classNames={{
                inputWrapper: 'shadow-none border-2 dark:border-opacity-40',
            }}
            onChange={({ target }) => dispatch(setTaskTitle(target.value))}
        />
    );
};

export default TaskDetailsTaskTitle;
