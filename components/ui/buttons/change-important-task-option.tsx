'use client';

// Public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';

//* Types
import { TransitionStartFunction } from 'react';
type ChangeImportantTaskTypes = {
    neededId: string;
    isImportant?: boolean;
    importantTransition?: TransitionStartFunction;
};

const ChangeImportantTaskOption = ({
    neededId,
    isImportant,
    importantTransition,
}: ChangeImportantTaskTypes) => {
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const changeImportantTitle = isImportant
        ? 'Mark as not important'
        : 'Mark as important';
    const changeImportantIcon = isImportant ? 'far' : 'fas';

    // Functions
    const changeImportant = async () => {
        // Req body
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
            onClick={() => importantTransition?.(() => changeImportant())}
        >
            {changeImportantTitle}
        </Chip>
    );
};

export default ChangeImportantTaskOption;
