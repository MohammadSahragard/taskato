'use client';

// public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { toast } from 'react-toastify';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';
import { updateSubtasks } from '@/redux/features/selectedTaskSlice';

//* functions
import { deleteSubtask as sendReq } from '@/helper/functions/task-functions';

const DeleteSubtaskOption = ({ neededId }: { neededId: string }) => {
    const dispatch = useAppDispatch();
    // states and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);

    // functions
    const deleteSubtask = async () => {
        await sendReq(neededId).then((res: any) => {
            // set result message to toastify
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
