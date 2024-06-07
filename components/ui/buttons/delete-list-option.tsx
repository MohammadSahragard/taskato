'use client';

// public
import { useDispatch, useSelector } from 'react-redux';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';

//* redux
import { getListsByEmail } from '@/redux/features/taskListsSlice';
import { getTasksByEmail } from '@/redux/features/tasksSlice';

const DeleteListOption = ({ id }: { id: string }) => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);

    // functions
    const deleteList = async () => {
        const res = await fetch('/api/task-lists/list', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (data.status === 200) {
            dispatch(getListsByEmail(userEmail));

            if (data.haveTask) {
                dispatch(getTasksByEmail(userEmail));
            }
        }
    };

    return (
        <Chip
            className='context-menu-options delete-options'
            startContent={
                <Icon
                    iconName='trash'
                    color='text-danger'
                />
            }
            onClick={deleteList}
        >
            Delete list
        </Chip>
    );
};

export default DeleteListOption;
