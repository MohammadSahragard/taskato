'use client';

// public
import { useState } from 'react';

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

const TodoDetailsDateBtn = () => {
    // hooks and variables
    const [date, setDate] = useState<any>();
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

    // functions
    const changeDatePicked = (date: Date | null) => {
        setDate(date);
        setIsOpenDatePicker(false);
    }

    return (
        <Dropdown
            className='bg-primary-100'
            isOpen={isOpenDatePicker}
            onOpenChange={() => setIsOpenDatePicker(!isOpenDatePicker)}
        >
            <DropdownTrigger>
                <Button
                    variant='bordered'
                    className='todo-details-btn'
                    fullWidth
                    radius='sm'
                    startContent={
                        <Icon
                            iconName='calendar-days'
                            color={date ? 'text-foreground' : ''}
                        />
                    }
                >
                    {date ? getLocalDateString(date) : 'Task date'}
                </Button>
            </DropdownTrigger>

            <DropdownMenu variant='flat'>
                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    endContent={<Subtitle subtitle={getDayOfWeek().today} />}
                    onClick={() => changeDatePicked(getDate().today)}
                >
                    Today
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-arrow-down' />}
                    endContent={<Subtitle subtitle={getDayOfWeek().tomorrow} />}
                    onClick={() => changeDatePicked(getDate().tomorrow)}
                >
                    Tomorrow
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-week' />}
                    endContent={<Subtitle subtitle='Saturday' />}
                    onClick={() => changeDatePicked(getDate().nextWeek)}
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
                                selected={date}
                                onSelect={(date: any) =>
                                    changeDatePicked(date)
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
                    className={date ? 'text-danger' : 'hidden'}
                    onClick={() => changeDatePicked(null)}
                    color='danger'
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default TodoDetailsDateBtn;