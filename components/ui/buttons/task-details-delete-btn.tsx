'use client';

// Public
import { useTransition } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Button } from '@nextui-org/react';

//* toastify
import { toast } from 'react-toastify';

//* Redux
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';
import { setIsOpenedDetailsSidebar } from '@/redux/features/options/optionsSlice';

const TaskDetailsDeleteBtn = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const taskData = useAppSelector((state) => state.selectedTask);
    const [isPending, startTransition] = useTransition();

    // Functions
    const deleteTask = async () => {
        const res = await fetch('/api/user-tasks/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: taskData._id }),
        });

        const data = await res.json();
        const messageStatus = data.status === 200 ? 'success' : 'error';
        toast[messageStatus](data.message);

        if (data.status === 200) {
            dispatch(setIsOpenedDetailsSidebar(false));
            dispatch(getTasksByEmail(taskData?.email ?? ''));
        }
    };

    return (
        <Button
            variant='ghost'
            color='danger'
            radius='sm'
            onClick={() => startTransition(() => deleteTask())}
            isLoading={isPending}
        >
            {isPending ? '' : 'Delete task'}
        </Button>
    );
};

export default TaskDetailsDeleteBtn;
