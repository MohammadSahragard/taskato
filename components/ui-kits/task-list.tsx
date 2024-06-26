'use client';

// Public
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Button, useDisclosure } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import { TaskListTypes } from '@/types/types';
import ItemsCounter from '../ui/texts/items-counter';
import { setContextMenuData } from '@/helper/functions/functions';
import RenameListModal from '../modals/rename-list-modal';

const TaskList = ({ id, href, label, listColor }: TaskListTypes) => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    // States and variables
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const tasks = useAppSelector((state) => state.tasks.data);
    const listCounter = tasks.filter(
        (task: any) => task.task_list.list_title === label
    );
    const contextMenuData = useAppSelector((state) => state.contextMenu);

    // Classes
    const defaultStyles = 'fw-btn pr-2 pl-3 relative';
    const isActiveLink = pathname === href ? 'bg-background' : '';
    const isActiveContextMenu =
        contextMenuData.itemData.id === id && contextMenuData.isShownMenu
            ? 'opacity-80 scale-95'
            : '';
    const finallyClass = `${defaultStyles} ${isActiveLink} ${isActiveContextMenu}`;

    // Context menu data
    const data = {
        id,
        title: label,
        onOpen,
    };

    return (
        <>
            <Button
                radius='sm'
                variant={pathname === href ? 'solid' : 'light'}
                className={finallyClass}
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

            {/* The modal of renaming a list */}
            <RenameListModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
};

export default TaskList;
