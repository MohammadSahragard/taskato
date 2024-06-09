'use client';

// Public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { toast } from 'react-toastify';

//* Redux
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';
import { updateSubtasks } from '@/redux/features/selected-task/selectedTaskSlice';

//* Functions
import { deleteSubtask as sendReq } from '@/helper/functions/task-functions';

const DeleteSubtaskOption = ({ neededId }: { neededId: string }) => {
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);

    // Functions
    const deleteSubtask = async () => {
        await sendReq(neededId).then((res: any) => {
            // Set result message to toastify
            const messageStatus = res.status === 200 ? 'success' : 'error';
            toast[messageStatus](res.message);

            if (res.status === 200) {
                dispatch(getTasksByEmail(userEmail));
                dispatch(updateSubtasks(res?.data));
            }
        });
    };

    return (
        <Chip
            variant='light'
            className='context-menu-options delete-options'
            startContent={
                <Icon
                    iconName='trash'
                    color='text-danger'
                />
            }
            onClick={deleteSubtask}
        >
            Delete subtask
        </Chip>
    );
};

export default DeleteSubtaskOption;
