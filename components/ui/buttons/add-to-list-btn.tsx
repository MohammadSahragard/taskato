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

const AddToListBtn = () => {
    // hooks and variables
    const pathname = usePathname();
    const [isOpenListPicker, setIsOpenListPicker] = useState(false);
    const [selectedKey, setSelectedKey] = useState('');

    // conditional rendering
    if (pathname === 'today') return null;
    if (pathname === 'important') return null;

    return (
        <Dropdown
            className='bg-primary-100'
            isOpen={isOpenListPicker}
            onOpenChange={() => setIsOpenListPicker(!isOpenListPicker)}
        >
            <DropdownTrigger>
                <Button
                    variant='light'
                    className='capitalize'
                    startContent={
                        <Icon
                            iconName='list-check'
                            color='text-foreground'
                        />
                    }
                    isIconOnly={selectedKey ? false : true}
                >
                    {selectedKey}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant='flat'
                selectionMode='single'
                onAction={(key: any) => setSelectedKey(wordsSeparator(key))}
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
                    className={selectedKey ? 'text-danger' : 'hidden'}
                    onClick={() => setSelectedKey('')}
                    color='danger'
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AddToListBtn;
