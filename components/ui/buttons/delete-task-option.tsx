'use client';

// public
import { useDispatch, useSelector } from 'react-redux';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { getTasksByEmail } from '@/redux/features/tasksSlice';
import { toast } from 'react-toastify';

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
            document.body.classList.remove('isOpenedDetailsSidebar');
            dispatch(getTasksByEmail(userEmail));
        }
    };

    return (
        <>
            <Chip
                className='bg-transparent text-danger !min-h-8 !min-w-full p-2'
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
        </>
    );
};

export default DeleteTaskOption;
