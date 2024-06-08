'use client';

// public
import { useTransition } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import { Button } from '@nextui-org/react';

//* functions
import { updateTask } from '@/helper/functions/task-functions';

//* toastify
import { toast } from 'react-toastify';

//* redux
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';

const TaskDetailsSaveBtn = () => {
    const dispatch = useAppDispatch();
    // states and variables
    const taskData = useAppSelector((state) => state.selectedTask);
    const [isPending, startTransition] = useTransition();

    // submit data
    const submitUpdateTask = async () => {
        const res = await updateTask(taskData);
        const messageStatus = res.status === 200 ? 'success' : 'error';
        toast[messageStatus](res.message);
        if (res.status === 200) {
            dispatch(getTasksByEmail(taskData.email));
        }
    };

    return (
        <Button
            color='primary'
            radius='sm'
            onClick={() => startTransition(() => submitUpdateTask())}
            isLoading={isPending}
        >
            {isPending ? '' : 'Save changes'}
        </Button>
    );
};

export default TaskDetailsSaveBtn;
