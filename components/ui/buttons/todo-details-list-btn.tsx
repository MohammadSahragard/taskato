'use client';

// public
import { useState } from 'react';
import { usePathname } from 'next/navigation';

//* components
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from '@nextui-org/react';
import Icon from '../texts/icon';

//* functions
import { wordsSeparator } from '@/helper/functions/functions';

const TodoDetailsListBtn = () => {
    // hooks and variables
    const [list, setList] = useState('');
    const pathname = usePathname();

    // conditional rendering
    if (pathname === 'today') return null;
    if (pathname === 'important') return null;

    return (
        <Dropdown
            className='bg-primary-100'
        >
            <DropdownTrigger>
                <Button
                    variant='bordered'
                    className='todo-details-btn'
                    fullWidth
                    startContent={
                        <Icon
                            iconName='list-check'
                            color={list ? 'text-foreground' : ''}
                        />
                    }
                >
                    {list || 'Task list'}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant='flat'
                selectionMode='single'
                onAction={(key: any) =>
                    setList(wordsSeparator(key))
                }
            >
                <DropdownItem
                    startContent={<Icon iconName='house-blank' />}
                    key='tasks'
                >
                    tasks
                </DropdownItem>

                <DropdownItem
                    startContent={
                        <Icon
                            iconName='trash'
                            color='text-danger'
                        />
                    }
                    className={list ? 'text-danger' : 'hidden'}
                    color='danger'
                    key=''
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default TodoDetailsListBtn;
