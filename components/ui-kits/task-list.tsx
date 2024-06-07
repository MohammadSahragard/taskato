'use client';

// public
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Button, useDisclosure } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import { TaskListTypes } from '@/types/types';
import ItemsCounter from '../ui/texts/items-counter';
import { setContextMenuData } from '@/helper/functions/functions';
import RenameListModal from '../modals/rename-list-modal';

const TaskList = ({ id, href, label, listColor }: TaskListTypes) => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    // states and variables
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const tasks = useSelector((state: any) => state.tasks.data);
    const listCounter = tasks.filter(
        (task: any) => task.task_list.list_title === label
    );

    const data = {
        id,
        onOpen,
    };

    return (
        <>
            <Button
                radius='sm'
                variant={pathname === href ? 'solid' : 'light'}
                className={`fw-btn pr-2 pl-3 relative ${
                    pathname === href ? 'bg-background' : ''
                }`}
                startContent={
                    <Icon
                        iconName='square'
                        forceColor={listColor}
                        style='fas'
                    />
                }
                endContent={<ItemsCounter value={listCounter?.length ?? 0} />}
                onContextMenu={(event: any) =>
                    setContextMenuData(event, 'lists', data, dispatch)
                }
            >
                <span className='flex-1 text-start capitalize'>{label}</span>
                <Link href={href}>
                    <div className='absolute inset-0'></div>
                </Link>
            </Button>

            {/* modal for rename list */}
            <RenameListModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
};

export default TaskList;
