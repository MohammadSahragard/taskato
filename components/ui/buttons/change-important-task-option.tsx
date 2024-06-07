'use client';

// public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { getTasksByEmail } from '@/redux/features/tasksSlice';

//* types
import { TransitionStartFunction } from 'react';

const ChangeImportantTaskOption = ({
    neededId,
    isImportant,
    importantTransition,
}: {
    neededId: string;
    isImportant?: boolean;
    importantTransition: TransitionStartFunction;
}) => {
    const dispatch = useAppDispatch();
    // states and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
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
        <Chip
            className='context-menu-options'
            startContent={
                <Icon
                    iconName='star'
                    style={changeImportantIcon}
                />
            }
            onClick={() => importantTransition(() => changeImportant())}
        >
            {changeImportantTitle}
        </Chip>
    );
};

export default ChangeImportantTaskOption;
