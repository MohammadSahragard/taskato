'use client';

// public
import { useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Button } from '@nextui-org/react';

//* functions
import { updateTask } from '@/helper/functions/todo-functions';

//* toastify
import { ToastContainer, toast } from 'react-toastify';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';

const TodoDetailsSaveBtn = () => {
    const dispatch = useDispatch();
    // states and variables
    const taskData = useSelector((state: any) => state.selectedTask);
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
        <>
            <Button
                color='primary'
                radius='sm'
                onClick={() => startTransition(() => submitUpdateTask())}
                isLoading={isPending}
            >
                {isPending ? '' : 'Save changes'}
            </Button>

            <ToastContainer theme='colored' />
        </>
    );
};

export default TodoDetailsSaveBtn;
