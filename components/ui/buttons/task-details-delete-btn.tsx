'use client';

// public
import { useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Button } from '@nextui-org/react';

//* toastify
import { toast } from 'react-toastify';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';

const TaskDetailsDeleteBtn = () => {
    const dispatch = useDispatch();
    // states and variables
    const taskData = useSelector((state: any) => state.selectedTask);
    const [isPending, startTransition] = useTransition();

    // functions
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
            document.body.classList.remove('isOpenedDetailsSidebar');
            dispatch(getTasksByEmail(taskData.email));
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
