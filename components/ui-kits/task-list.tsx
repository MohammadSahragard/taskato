'use client';

// public
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import { TaskListTypes } from '@/types/types';
import ItemsCounter from '../ui/texts/items-counter';
import ListItemOptions from './list-item-options';

const TaskList = ({ id, userEmail, href, label, listColor }: TaskListTypes) => {
    const pathname = usePathname();
    // states and variables
    const [isOpenOptions, setIsOpenOptions] = useState(false);
    const tasks = useSelector((state: any) => state.tasks.data);
    const listCounter = tasks.filter(
        (task: any) => task.task_list.list_title === label
    );

    // functions
    const openOptions = (event: any) => {
        event.preventDefault();
        setIsOpenOptions(!isOpenOptions);
    };

    const closeOptionsMenu = () => setIsOpenOptions(false);

    return (
        <ListItemOptions
            neededId={id}
            neededTitle={label}
            userEmail={userEmail}
            isOpenOptions={isOpenOptions}
            closeOptionsMenu={closeOptionsMenu}
        >
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
                onContextMenu={(event: any) => openOptions(event)}
            >
                <span className='flex-1 text-start capitalize'>{label}</span>
                <Link href={href}>
                    <div className='absolute inset-0'></div>
                </Link>
            </Button>
        </ListItemOptions>
    );
};

export default TaskList;
