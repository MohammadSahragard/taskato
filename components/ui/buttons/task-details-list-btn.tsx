'use client';

// public
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from '@nextui-org/react';
import Icon from '../texts/icon';
import TooltipElement from '../texts/tooltip-element';

//* redux
import { setTaskSelectedList } from '@/redux/features/selectedTaskSlice';

const TaskDetailsListBtn = () => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    // hooks and variables
    const list = useAppSelector((state) => state.selectedTask.task_list);
    const lists = useAppSelector((state) => state.taskLists);

    // conditional rendering
    if (pathname === 'today') return null;
    if (pathname === 'important') return null;

    return (
        <Dropdown className='bg-primary-100'>
            <TooltipElement title='Add to list'>
                <div>
                    <DropdownTrigger>
                        <Button
                            variant='bordered'
                            className='task-details-btn'
                            fullWidth
                            radius='sm'
                            startContent={
                                <Icon
                                    iconName='list-check'
                                    color={
                                        list?.list_title
                                            ? 'text-foreground'
                                            : ''
                                    }
                                />
                            }
                        >
                            {list.list_title || 'Task list'}
                        </Button>
                    </DropdownTrigger>
                </div>
            </TooltipElement>
            <DropdownMenu
                variant='flat'
                selectionMode='single'
            >
                {lists?.data?.length ? (
                    lists?.data?.map((list: any) => (
                        <DropdownItem
                            key={list?.list_title}
                            className='capitalize'
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
                                        title_title: list?.list_title,
                                        color_color: list?.list_color,
                                    })
                                )
                            }
                        >
                            {list?.list_title ?? 'List item'}
                        </DropdownItem>
                    ))
                ) : (
                    <DropdownItem isReadOnly>There is no list</DropdownItem>
                )}

                <DropdownItem
                    startContent={
                        <Icon
                            iconName='trash'
                            color='text-danger'
                        />
                    }
                    className={list?.list_title ? 'text-danger' : 'hidden'}
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

export default TaskDetailsListBtn;
