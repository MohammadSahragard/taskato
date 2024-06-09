'use client';

// Public
import { useTransition } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Button } from '@nextui-org/react';
import CheckSubtaskBtn from './check-subtask-btn';

//* Redux
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';
import { updateSubtasks } from '@/redux/features/selected-task/selectedTaskSlice';
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
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const [isPending, startTransition] = useTransition();
    const contextMenuData = useAppSelector((state) => state.contextMenu);

    // Classes
    const isActiveContextMenu =
        contextMenuData.itemData.id === _id && contextMenuData.isShownMenu
            ? 'opacity-80 scale-95'
            : '';

    // Functions
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

    // Context menu data
    const data = {
        id: _id,
        isCompleted,
        checkHandler: checkHandler,
    };

    return (
        <Button
            className={`task-details-subtask ${isActiveContextMenu}`}
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
