'use client';

// Public
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@nextui-org/react';
import Icon from '../texts/icon';
import Subtitle from '../texts/subtitle';
import Calendar from '@/components/ui-kits/calendar';

//* Functions
import {
    getDayOfWeek,
    getDate,
    getLocalDateString,
} from '@/helper/functions/functions';

//* Redux
import { setTaskDate } from '@/redux/features/task-data/taskDataSlice';
import TooltipElement from '../texts/tooltip-element';

const AddDateBtn = () => {
    const pathname = usePathname();
    // States and variables
    const dispatch = useAppDispatch();
    const taskDate = useAppSelector((state) => state.taskData.task_due_date);
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

    // Functions
    const confirmDatePicked = (date: Date | undefined) => {
        dispatch(setTaskDate(date));
        setIsOpenDatePicker(false);
    };

    // Conditional rendering
    if (pathname.includes('today')) return null;
    return (
        <Dropdown
            className='bg-primary-100'
            isOpen={isOpenDatePicker}
            onOpenChange={() => setIsOpenDatePicker(!isOpenDatePicker)}
        >
            {/* The dropdown trigger */}
            <TooltipElement title='Add due date'>
                <div>
                    <DropdownTrigger>
                        <Button
                            variant='light'
                            className='capitalize'
                            radius='sm'
                            startContent={
                                <Icon
                                    iconName='calendar-days'
                                    color={taskDate ? 'text-foreground' : ''}
                                />
                            }
                            isIconOnly={taskDate ? false : true}
                        >
                            {taskDate ? getLocalDateString(taskDate) : null}
                        </Button>
                    </DropdownTrigger>
                </div>
            </TooltipElement>

            {/* The dropdown menu */}
            <DropdownMenu variant='flat'>
                {/* The default options */}
                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    endContent={<Subtitle subtitle={getDayOfWeek().today} />}
                    onClick={() => confirmDatePicked(getDate().today)}
                >
                    Today
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-arrow-down' />}
                    endContent={<Subtitle subtitle={getDayOfWeek().tomorrow} />}
                    onClick={() => confirmDatePicked(getDate().tomorrow)}
                >
                    Tomorrow
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-week' />}
                    endContent={<Subtitle subtitle='Saturday' />}
                    onClick={() => confirmDatePicked(getDate().nextWeek)}
                    showDivider
                >
                    Next Week
                </DropdownItem>

                {/* Optional selection option (calendar popover) */}
                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    isReadOnly
                >
                    <Popover>
                        <PopoverTrigger>Pick a date</PopoverTrigger>
                        <PopoverContent className='p-0 bg-background'>
                            <Calendar
                                mode='single'
                                className='rounded-md border'
                                selected={taskDate}
                                onSelect={(date: any) =>
                                    confirmDatePicked(date)
                                }
                                disabled={{ before: new Date() }}
                            />
                        </PopoverContent>
                    </Popover>
                </DropdownItem>
                <DropdownItem
                    startContent={
                        <Icon
                            iconName='trash'
                            color='text-danger'
                        />
                    }
                    className={taskDate ? 'text-danger' : 'hidden'}
                    onClick={() => confirmDatePicked(undefined)}
                    color='danger'
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AddDateBtn;
