'use client';

// public
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//* components
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

//* functions
import {
    getDayOfWeek,
    getDate,
    getLocalDateString,
} from '@/helper/functions/functions';

//* redux
import { setTaskDate } from '@/redux/features/todoSlice';
import TooltipElement from '../texts/tooltip-element';

const AddDateBtn = () => {
    // hooks and variables
    const dispatch = useDispatch();
    const taskDate = useSelector((state: any) => state.taskData.taskDate);
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

    // functions
    const confirmDatePicked = (date: Date | null) => {
        dispatch(setTaskDate(date));
        setIsOpenDatePicker(false);
    };

    return (
        <Dropdown
            className='bg-primary-100'
            isOpen={isOpenDatePicker}
            onOpenChange={() => setIsOpenDatePicker(!isOpenDatePicker)}
        >
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

            <DropdownMenu variant='flat'>
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
                    onClick={() => confirmDatePicked(null)}
                    color='danger'
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AddDateBtn;
