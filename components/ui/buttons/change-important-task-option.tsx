'use client';

// public
import { useDispatch, useSelector } from 'react-redux';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { getTasksByEmail } from '@/redux/features/tasksSlice';

const ChangeImportantTaskOption = ({
    neededId,
    isImportant,
}: {
    neededId: string;
    isImportant?: boolean;
}) => {
    const dispatch = useDispatch();
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const changeImportantTitle = isImportant
        ? 'Mark as not important'
        : 'Mark as important';
    const changeImportantIcon = isImportant ? 'far' : 'fas';

    // functions
    const changeImportant = async () => {
        // req body
        const reqBody = {
            reqData: { is_in_important: !isImportant },
            _id: neededId,
        };

        const req = await fetch('/api/user-tasks/task', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });
        const res = await req.json();
        if (res.status === 200) {
            dispatch(getTasksByEmail(userEmail));
        }
    };

    return (
        <>
            <Chip
                className='bg-transparent !min-h-8 !min-w-full p-2'
                startContent={
                    <Icon
                        iconName='star'
                        style={changeImportantIcon}
                    />
                }
                onClick={changeImportant}
            >
                {changeImportantTitle}
            </Chip>
        </>
    );
};

export default ChangeImportantTaskOption;
