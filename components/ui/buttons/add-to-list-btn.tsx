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

//* redux
import { setSelectedList } from '@/redux/features/todoSlice';

//* hooks
import useUserLists from '@/hooks/use-user-lists';

const AddToListBtn = () => {
    // hooks and variables
    const dispatch = useDispatch();
    const pathname = usePathname();
    const taskSelectedList = useSelector(
        (state: any) => state.taskData.taskList
    );
    const lists = useUserLists();

    // conditional rendering
    if (pathname === 'today') return null;
    if (pathname === 'important') return null;

    return (
        <Dropdown className='bg-primary-100'>
            <DropdownTrigger>
                <Button
                    variant='light'
                    className='capitalize'
                    radius='sm'
                    startContent={
                        <Icon
                            iconName='list-check'
                            color={taskSelectedList ? 'text-foreground' : ''}
                        />
                    }
                    isIconOnly={taskSelectedList ? false : true}
                >
                    {taskSelectedList}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant='flat'
                selectionMode='single'
                onAction={(key: any) =>
                    dispatch(setSelectedList(wordsSeparator(key)))
                }
            >
                {lists?.data?.map((list: any) => (
                    <DropdownItem
                        startContent={
                            <Icon
                                iconName='square'
                                style='fas'
                                forceColor={list?.list_color ?? '#ff0'}
                            />
                        }
                        key={list?.list_title}
                    >
                        {list?.list_title ?? 'List item'}
                    </DropdownItem>
                )) ?? null}

                <DropdownItem
                    startContent={
                        <Icon
                            iconName='trash'
                            color='text-danger'
                        />
                    }
                    className={taskSelectedList ? 'text-danger' : 'hidden'}
                    color='danger'
                    key=''
                >
                    Remove from list
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AddToListBtn;
