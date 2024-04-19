'use client';

// public
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

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
import { setSelectedList } from '@/redux/features/todoSlice';

const AddToListBtn = () => {
    // hooks and variables
    const dispatch = useDispatch();
    const todoSelectedList = useSelector(
        (state: any) => state.todoContent.todoList
    );

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
                    variant='light'
                    className='capitalize'
                    startContent={
                        <Icon
                            iconName='list-check'
                            color={todoSelectedList ? 'text-foreground' : ''}
                        />
                    }
                    isIconOnly={todoSelectedList ? false : true}
                >
                    {todoSelectedList}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant='flat'
                selectionMode='single'
                onAction={(key: any) =>
                    dispatch(setSelectedList(wordsSeparator(key)))
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
                    className={todoSelectedList ? 'text-danger' : 'hidden'}
                    color='danger'
                    key=''
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AddToListBtn;
