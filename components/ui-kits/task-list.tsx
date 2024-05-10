'use client';

// public
import Link from 'next/link';
import { usePathname } from 'next/navigation';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import { TaskListTypes } from '@/types/types';
import ItemsCounter from '../ui/texts/items-counter';

const TaskList = ({ href, label, listColor }: TaskListTypes) => {
    const pathname = usePathname();

    return (
        <Link href={href}>
            <Button
                radius='sm'
                variant={pathname === href ? 'solid' : 'light'}
                className={`fw-btn ${pathname === href ? 'bg-background' : ''}`}
                startContent={
                    <Icon
                        iconName='square'
                        forceColor={listColor}
                        style='fas'
                    />
                }
                endContent={<ItemsCounter value={5} />}
            >
                <span className='flex-1 text-start'>{label}</span>
            </Button>
        </Link>
    );
};

export default TaskList;
