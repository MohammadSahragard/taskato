'use client';

// public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import { Input } from '@nextui-org/react';

//* redux
import { setTaskTitle } from '@/redux/features/selected-task/selectedTaskSlice';

const TaskDetailsTaskTitle = () => {
    const dispatch = useAppDispatch();
    // states and variables
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
