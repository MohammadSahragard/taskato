'use client';

// public
import { useDispatch } from 'react-redux';

//* components
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
} from '@nextui-org/react';
import ChangeCheckTaskOption from '../ui/buttons/change-check-task-option';

//* types
import { TaskOptionsTypes } from '@/types/types';
import ChangeImportantTaskOption from '../ui/buttons/change-important-task-option';
import DeleteTaskOption from '../ui/buttons/delete-task-option';

const TaskItemOptions = ({
    neededId,
    isCompleted,
    isImportant,
    isOpenOptions,
    closeOptionsMenu,
    children,
}: TaskOptionsTypes) => {
    return (
        <Dropdown
            isOpen={isOpenOptions}
            radius='sm'
            onOpenChange={closeOptionsMenu}
            className='bg-primary-100 w-72'
        >
            <DropdownTrigger>{children}</DropdownTrigger>
            <DropdownMenu variant='flat'>
                <DropdownSection showDivider>
                    <DropdownItem className='p-0 rounded'>
                        <ChangeCheckTaskOption
                            neededId={neededId}
                            isCompleted={isCompleted}
                        />
                    </DropdownItem>
                    <DropdownItem className='p-0 rounded'>
                        <ChangeImportantTaskOption
                            neededId={neededId}
                            isImportant={isImportant}
                        />
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem className='p-0 rounded'>
                    <DeleteTaskOption neededId={neededId} />
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default TaskItemOptions;
