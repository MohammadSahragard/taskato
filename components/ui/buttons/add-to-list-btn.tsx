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
import { setSelectedList } from '@/redux/features/task-data/taskDataSlice';

const AddToListBtn = () => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    // hooks and variables
    const taskSelectedList = useAppSelector(
        (state) => state.taskData.task_list
    );
    const lists: any = useAppSelector((state) => state.taskLists.data);

    // conditional rendering
    if (pathname.includes('list')) return null;
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
                {lists.length ? (
                    lists?.map((list: any) => (
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
                                    setSelectedList({
                                        title: list?.list_title,
                                        color: list?.list_color,
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
