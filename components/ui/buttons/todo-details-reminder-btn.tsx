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
import DateTimePicker from '@/components/ui-kits/date-time-picker';

//* functions
import {
    laterTime,
    getDate,
    getDayOfWeek,
    zeroBeforeSingle,
    dateToLocalDateString,
} from '@/helper/functions/functions';

//* types
type saveReminderType = {
    hour: number;
    minute: number;
    date: Date;
};

const TodoDetailsReminderBtn = () => {
    // hooks and variables
    const [reminder, setReminder] = useState({
        time: {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
        },
        date: new Date(),
        isTrueReminder: false,
    });
    const [isOpenPicker, setIsOpenPicker] = useState(false);

    // functions
    const saveReminder = ({ hour, minute, date }: saveReminderType) => {
        setReminder({
            time: {
                hour: hour,
                minute: minute,
            },
            date: date,
            isTrueReminder: true,
        });
    };

    return (
        <Dropdown
            className='bg-primary-100'
            isOpen={isOpenPicker}
            onOpenChange={() => setIsOpenPicker(!isOpenPicker)}
        >
            <DropdownTrigger>
                <Button
                    variant='bordered'
                    className='todo-details-btn text-start leading-none'
                    fullWidth
                    radius='sm'
                    startContent={
                        <Icon
                            iconName='alarm-clock'
                            color={
                                reminder.isTrueReminder ? 'text-foreground' : ''
                            }
                        />
                    }
                >
                    {reminder.isTrueReminder ? (
                        <section>
                            <span>
                                {zeroBeforeSingle(reminder.time.hour)}:
                                {zeroBeforeSingle(reminder.time.minute)}
                            </span>
                            <Subtitle
                                subtitle={dateToLocalDateString(reminder.date)}
                                additionalClasses='text-xs'
                            />
                        </section>
                    ) : (
                        'Task reminder'
                    )}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant='flat'
                selectionMode='single'
            >
                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    endContent={
                        <Subtitle subtitle={`Later ${laterTime()}:00`} />
                    }
                    key='today'
                    onClick={() =>
                        saveReminder({
                            hour: laterTime(),
                            minute: 0,
                            date: getDate().today,
                        })
                    }
                >
                    Today
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-arrow-down' />}
                    endContent={
                        <Subtitle
                            subtitle={`${getDayOfWeek().tomorrow}, 09:00`}
                        />
                    }
                    key='tomorrow'
                    onClick={() =>
                        saveReminder({
                            hour: 9,
                            minute: 0,
                            date: getDate().tomorrow,
                        })
                    }
                >
                    Tomorrow
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-week' />}
                    endContent={<Subtitle subtitle='Saturday, 09:00' />}
                    key='next-week'
                    onClick={() =>
                        saveReminder({
                            hour: 9,
                            minute: 0,
                            date: getDate().nextWeek,
                        })
                    }
                    showDivider
                >
                    Next Week
                </DropdownItem>

                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    isReadOnly
                >
                    <Popover>
                        <PopoverTrigger>Pick a date & time</PopoverTrigger>
                        <PopoverContent className='p-0 bg-background'>
                            <DateTimePicker taskReminder={reminder} />
                            <Button
                                size='sm'
                                className='m-2 bg-foreground text-background self-end'
                                onClick={() => {
                                    setReminder({
                                        ...reminder,
                                        isTrueReminder: true,
                                    });
                                    setIsOpenPicker(false);
                                }}
                            >
                                Save
                            </Button>
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
                    className={
                        reminder.isTrueReminder ? 'text-danger' : 'hidden'
                    }
                    onClick={() =>
                        setReminder({ ...reminder, isTrueReminder: false })
                    }
                    color='danger'
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default TodoDetailsReminderBtn;
