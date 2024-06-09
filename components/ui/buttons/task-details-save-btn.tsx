'use client';

// Public
import { useTransition } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Button } from '@nextui-org/react';

//* Functions
import { updateTask } from '@/helper/functions/task-functions';

//* toastify
import { toast } from 'react-toastify';

//* Redux
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';

const TaskDetailsSaveBtn = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const taskData = useAppSelector((state) => state.selectedTask);
    const [isPending, startTransition] = useTransition();

    // Submit data
    const submitUpdateTask = async () => {
        const res = await updateTask(taskData);
        const messageStatus = res.status === 200 ? 'success' : 'error';
        toast[messageStatus](res.message);
        if (res.status === 200) {
            dispatch(getTasksByEmail(taskData?.email ?? ''));
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
