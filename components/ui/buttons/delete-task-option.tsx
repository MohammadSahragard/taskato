'use client';

// public
import { useDispatch, useSelector } from 'react-redux';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { toast } from 'react-toastify';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';
import { setIsOpenedDetailsSidebar } from '@/redux/features/optionsSlice';

const DeleteTaskOption = ({ neededId }: { neededId: string }) => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);

    // functions
    const deleteTask = async () => {
        const res = await fetch('/api/user-tasks/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: neededId }),
        });

        const data = await res.json();
        const messageStatus = data.status === 200 ? 'success' : 'error';
        toast[messageStatus](data.message);

        if (data.status === 200) {
            dispatch(setIsOpenedDetailsSidebar(false));
            dispatch(getTasksByEmail(userEmail));
        }
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
            onClick={deleteTask}
        >
            Delete task
        </Chip>
    );
};

export default DeleteTaskOption;
