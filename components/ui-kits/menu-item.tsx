'use client';

// public
import Link from 'next/link';
import { usePathname } from 'next/navigation';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import { MenuItemTypes } from '@/types/types';
import ItemsCounter from '../ui/texts/items-counter';

const MenuItem = ({ href, label, iconName }: MenuItemTypes) => {
    const pathname = usePathname();

    return (
        <Link href={href}>
            <Button
                radius='sm'
                variant={pathname === href ? 'solid' : 'light'}
                className={`fw-btn pr-2 pl-3 ${pathname === href ? 'bg-background' : ''}`}
                startContent={
                    <Icon
                        iconName={iconName}
                        style='far'
                    />
                }
                endContent={<ItemsCounter value={5} />}
            >
                <span className='flex-1 text-start'>{label}</span>
            </Button>
        </Link>
    );
};

export default MenuItem;
