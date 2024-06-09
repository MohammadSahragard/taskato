'use client';

// Public
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from '@nextui-org/react';
import Icon from '../texts/icon';
import TooltipElement from '../texts/tooltip-element';

//* Redux
import { setTaskSelectedList } from '@/redux/features/selected-task/selectedTaskSlice';

const TaskDetailsListBtn = () => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    // States and variables
    const list = useAppSelector((state) => state.selectedTask.task_list);
    const lists: any = useAppSelector((state) => state.taskLists);

    // Conditional rendering
    if (pathname === 'today') return null;
    if (pathname === 'important') return null;
    return (
        <Dropdown className='bg-primary-100'>
            {/* The dropdown trigger */}
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
            
            {/* The dropdown menu */}
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
