'use client';

// public
import { useDispatch, useSelector } from 'react-redux';

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
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);

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
