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
import { setTaskSelectedList } from '@/redux/features/selectedTaskSlice';

//* hooks
import useUserLists from '@/hooks/use-user-lists';

const TodoDetailsListBtn = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    // hooks and variables
    const list = useSelector((state: any) => state.selectedTask.task_list);
    const lists = useUserLists();

    // conditional rendering
    if (pathname === 'today') return null;
    if (pathname === 'important') return null;

    return (
        <Dropdown className='bg-primary-100'>
            <DropdownTrigger>
                <Button
                    variant='bordered'
                    className='todo-details-btn'
                    fullWidth
                    radius='sm'
                    startContent={
                        <Icon
                            iconName='list-check'
                            color={list ? 'text-foreground' : ''}
                        />
                    }
                >
                    {list.list_title || 'Task list'}
                </Button>
            </DropdownTrigger>
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
                                setTaskSelectedList({
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
                    className={list ? 'text-danger' : 'hidden'}
                    color='danger'
                    onClick={() =>
                        dispatch(
                            setTaskSelectedList({
                                list_title: '',
                                list_color: '',
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

export default TodoDetailsListBtn;
