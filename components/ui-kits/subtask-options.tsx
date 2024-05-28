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
import { SubtaskOptionsTypes } from '@/types/types';
import Icon from '../ui/texts/icon';
import { toast } from 'react-toastify';

//* redux
import { getTasksByEmail } from '@/redux/features/tasksSlice';
import { updateSubtasks } from '@/redux/features/selectedTaskSlice';

//* functions
import { deleteSubtask as sendReq } from '@/helper/functions/todo-functions';

const SubtaskOptions = ({
    subtaskId,
    userEmail,
    isOpenOptions,
    closeOptionsMenu,
    children,
}: SubtaskOptionsTypes) => {
    const dispatch = useDispatch();

    // functions
    const deleteSubtask = async () => {
        await sendReq(subtaskId).then((res: any) => {
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
                    className='rounded text-danger hover:!text-danger'
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
