'use client';

// Public
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/redux/app/hook';

//* Components
import { Button } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import ItemsCounter from '../ui/texts/items-counter';

//* Types
import { MenuItemTypes } from '@/types/types';

//* Functions
import { dateToLocalDateString } from '@/helper/functions/functions';

const MenuItem = ({ href, label, iconName }: MenuItemTypes) => {
    const pathname = usePathname();
    // States and variables
    const tasks = useAppSelector((state) => state.tasks.data);
    const notes = useAppSelector((state) => state.notes.data);
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
