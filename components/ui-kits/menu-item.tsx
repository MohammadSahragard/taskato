'use client';

// public
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import ItemsCounter from '../ui/texts/items-counter';

//* types
import { MenuItemTypes } from '@/types/types';

//* functions
import { dateToLocalDateString } from '@/helper/functions/functions';

const MenuItem = ({ href, label, iconName }: MenuItemTypes) => {
    const pathname = usePathname();
    // states and variables
    const tasks = useSelector((state: any) => state.tasks.data);
    const notes = useSelector((state: any) => state.notes.data);
    const itemsCounter: any = {
        '/': tasks,
        '/today': tasks?.filter(
            (task: any) =>
                dateToLocalDateString(new Date(task.task_due_date)) ===
                dateToLocalDateString(new Date())
        ),
        '/important': tasks?.filter((task: any) => task.is_in_important),
        '/sticky-notes': notes,
    };

    return (
        <Button
            radius='sm'
            variant={pathname === href ? 'solid' : 'light'}
            className={`fw-btn pr-2 pl-3 relative ${
                pathname === href ? 'bg-background' : ''
            }`}
            startContent={
                <Icon
                    iconName={iconName}
                    style='far'
                />
            }
            endContent={
                <ItemsCounter value={itemsCounter[href]?.length ?? 0} />
            }
        >
            <span className='flex-1 text-start'>{label}</span>
            <Link href={href}>
                <div className='absolute inset-0'></div>
            </Link>
        </Button>
    );
};

export default MenuItem;
