'use client';

// public
import { useState, useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Button } from '@nextui-org/react';
import CheckSubtaskBtn from './check-subtask-btn';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';
import { updateSubtasks } from '@/redux/features/selectedTaskSlice';
import SubtaskOptions from '@/components/ui-kits/subtask-options';

const TaskDetailsSubtask = ({
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
    const [isOpenOptions, setIsOpenOptions] = useState(false);

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

    // context menu functions
    const openOptions = (event: any) => {
        event.preventDefault();
        setIsOpenOptions(!isOpenOptions);
    };

    const closeOptionsMenu = () => setIsOpenOptions(false);

    return (
        <SubtaskOptions
            userEmail={userEmail}
            neededId={_id}
            isCompleted={isCompleted}
            checkHandler={checkHandler}
            isOpenOptions={isOpenOptions}
            closeOptionsMenu={closeOptionsMenu}
        >
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
                onContextMenu={(event: any) => openOptions(event)}
                isLoading={isPending}
            >
                {title}
            </Button>
        </SubtaskOptions>
    );
};

export default TaskDetailsSubtask;
