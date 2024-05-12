'use client';

// public
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import { TaskListTypes } from '@/types/types';
import ItemsCounter from '../ui/texts/items-counter';
import ListItemOptions from './list-item-options';

const TaskList = ({ id, userEmail, href, label, listColor }: TaskListTypes) => {
    const pathname = usePathname();
    const [isOpenOptions, setIsOpenOptions] = useState(false);

    // functions
    const openOptions = (event: any) => {
        event.preventDefault();
        setIsOpenOptions(!isOpenOptions);
    };

    const closeOptionsMenu = () => setIsOpenOptions(false);

    return (
        <ListItemOptions
            listId={id}
            listTitle={label}
            userEmail={userEmail}
            isOpenOptions={isOpenOptions}
            closeOptionsMenu={closeOptionsMenu}
        >
            <Link href={href}>
                <Button
                    radius='sm'
                    variant={pathname === href ? 'solid' : 'light'}
                    className={`fw-btn pr-2 pl-3 ${
                        pathname === href ? 'bg-background' : ''
                    }`}
                    startContent={
                        <Icon
                            iconName='square'
                            forceColor={listColor}
                            style='fas'
                        />
                    }
                    endContent={<ItemsCounter value={5} />}
                    onContextMenu={(event: any) => openOptions(event)}
                >
                    <span className='flex-1 text-start'>{label}</span>
                </Button>
            </Link>
        </ListItemOptions>
    );
};

export default TaskList;
