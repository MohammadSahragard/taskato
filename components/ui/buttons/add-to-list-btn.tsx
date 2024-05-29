'use client';

// public
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

//* redux
import { setSelectedList } from '@/redux/features/todoSlice';

//* hooks
import useUserLists from '@/hooks/use-user-lists';
import TooltipElement from '../texts/tooltip-element';

const AddToListBtn = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    // hooks and variables
    const taskSelectedList = useSelector(
        (state: any) => state.taskData.taskList
    );
    const lists = useUserLists();

    // conditional rendering
    if (pathname === 'today') return null;
    if (pathname === 'important') return null;

    return (
        <Dropdown className='bg-primary-100'>
            <TooltipElement title='Add to list'>
                <div>
                    <DropdownTrigger>
                        <Button
                            variant='light'
                            className='capitalize'
                            radius='sm'
                            startContent={
                                <Icon
                                    iconName='list-check'
                                    color={
                                        taskSelectedList.list_title
                                            ? 'text-foreground'
                                            : ''
                                    }
                                />
                            }
                            isIconOnly={
                                taskSelectedList.list_title ? false : true
                            }
                        >
                            {taskSelectedList.list_title}
                        </Button>
                    </DropdownTrigger>
                </div>
            </TooltipElement>
            <DropdownMenu
                variant='flat'
                selectionMode='single'
            >
                {lists?.data?.map((list: any) => (
                    <DropdownItem
                        key={list?.list_title}
                        startContent={
                            <Icon
                                iconName='square'
                                style='fas'
                                forceColor={list?.list_color ?? '#ff0'}
                            />
                        }
                        onClick={() =>
                            dispatch(
                                setSelectedList({
                                    title: list?.list_title,
                                    color: list?.list_color,
                                })
                            )
                        }
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
                    className={
                        taskSelectedList.list_title ? 'text-danger' : 'hidden'
                    }
                    color='danger'
                    onClick={() =>
                        dispatch(
                            setSelectedList({
                                title: '',
                                color: '',
                            })
                        )
                    }
                >
                    Remove from list
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AddToListBtn;
