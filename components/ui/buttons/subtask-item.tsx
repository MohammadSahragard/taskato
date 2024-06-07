'use client';

// public
import { useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Button } from '@nextui-org/react';
import CheckSubtaskBtn from './check-subtask-btn';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';
import { updateSubtasks } from '@/redux/features/selectedTaskSlice';
import { setContextMenuData } from '@/helper/functions/functions';

const SubtaskItem = ({
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
        if (res.status === 200) {
            dispatch(getTasksByEmail(userEmail));
            dispatch(updateSubtasks(res?.data));
        }
    };
    const checkHandler = () => startTransition(() => changeCheck());

    // context menu data
    const data = {
        id: _id,
        isCompleted,
        checkHandler: checkHandler,
    };

    return (
        <Button
            className='task-details-subtask'
            fullWidth
            radius='sm'
            startContent={
                <CheckSubtaskBtn
                    isCompleted={isCompleted}
                    isPending={isPending}
                />
            }
            onClick={checkHandler}
            onContextMenu={(event: any) =>
                setContextMenuData(event, 'subtasks', data, dispatch)
            }
            isLoading={isPending}
        >
            {title}
        </Button>
    );
};

export default SubtaskItem;
