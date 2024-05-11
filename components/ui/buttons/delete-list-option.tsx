'use client';

// public
import { useDispatch } from 'react-redux';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';

//* redux
import { getListsByEmail } from '@/redux/features/taskListsSlice';

const DeleteListOption = ({
    id,
    userEmail,
}: {
    id: string;
    userEmail: string;
}) => {
    const dispatch = useDispatch();

    // functions
    const deleteList = async () => {
        const res = await fetch('/api/task-lists/list', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        const result = await res.json();
        if (result.status === 200) {
            dispatch(getListsByEmail(userEmail));
        }
    };

    return (
        <Chip
            className='bg-transparent !min-h-8 !min-w-full text-danger p-2'
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
