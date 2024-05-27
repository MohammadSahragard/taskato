'use client';

// public
import { useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Button } from '@nextui-org/react';
import CheckTodoSubtaskBtn from '../buttons/check-todo-subtask-btn';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';

const TodoDetailsSubtask = ({
    _id,
    title,
    isCompleted,
}: {
    _id: string;
    title: string;
    isCompleted: boolean;
}) => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const [isPending, startTransition] = useTransition();

    // functions
    const changeCheck = async () => {
        // req body
        const reqBody = {
            reqData: {
                $set: {
                    'subtasks.$.subtask_completion': !isCompleted,
                    'subtasks.$.subtask_title': title,
                },
            },
            _id,
        };

        const req = await fetch('/api/user-tasks/subtask', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });
        const res = await req.json();
        console.log('res: ', res);
        if (res.status === 200) {
            dispatch(getTasksByEmail(userEmail));
        }
    };

    return (
        <Button
            className='todo-details-subtask'
            fullWidth
            radius='sm'
            startContent={
                <CheckTodoSubtaskBtn
                    isCompleted={isCompleted}
                    isPending={isPending}
                />
            }
            onClick={() => startTransition(() => changeCheck())}
            isLoading={isPending}
        >
            {title}
        </Button>
    );
};

export default TodoDetailsSubtask;
