'use client';

// public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';

//* redux
import { getListsByEmail } from '@/redux/features/lists/listsSlice';
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';

const DeleteListOption = ({ id }: { id: string }) => {
    const dispatch = useAppDispatch();
    // states and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);

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
