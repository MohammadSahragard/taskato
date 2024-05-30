'use client';

// public
import { useDispatch } from 'react-redux';

//* components
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import { toast } from 'react-toastify';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';
import { updateSubtasks } from '@/redux/features/selectedTaskSlice';

//* functions
import { deleteSubtask as sendReq } from '@/helper/functions/task-functions';

//* types
import { SubtaskOptionsTypes } from '@/types/types';

const SubtaskOptions = ({
    neededId,
    userEmail,
    isOpenOptions,
    isCompleted,
    checkHandler,
    closeOptionsMenu,
    children,
}: SubtaskOptionsTypes) => {
    const dispatch = useDispatch();
    // states and variables
    const changeCheckTitle = isCompleted
        ? 'Mark as not completed'
        : 'Mark as completed';
    const changeCheckIcon = isCompleted ? 'square' : 'square-check';

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
        <Dropdown
            isOpen={isOpenOptions}
            radius='sm'
            onOpenChange={closeOptionsMenu}
            className='bg-primary-100'
        >
            <DropdownTrigger>{children}</DropdownTrigger>

            <DropdownMenu variant='flat'>
                <DropdownItem
                    className='p-1 rounded'
                    startContent={<Icon iconName={changeCheckIcon} />}
                    onClick={checkHandler}
                >
                    {changeCheckTitle}
                </DropdownItem>

                <DropdownItem
                    className='p-1 rounded text-danger hover:!text-danger'
                    startContent={
                        <Icon
                            iconName='trash'
                            color='text-danger'
                        />
                    }
                    onClick={deleteSubtask}
                >
                    Delete subtask
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default SubtaskOptions;
