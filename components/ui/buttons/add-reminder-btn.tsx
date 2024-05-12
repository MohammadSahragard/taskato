'use client';

// public
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

//* redux
import { setTodoReminder, setShowReminder } from '@/redux/features/todoSlice';

//* types
type saveReminderType = {
    hour: number;
    minute: number;
    date: Date;
};

const AddReminderBtn = () => {
    // hooks and variables
    const dispatch = useDispatch();
    const todoReminder = useSelector(
        (state: any) => state.todoContent.todoReminder
    );
    const [isOpenPicker, setIsOpenPicker] = useState(false);

    // functions
    const saveReminder = ({ hour, minute, date }: saveReminderType) => {
        dispatch(
            setTodoReminder({
                time: {
                    hour: hour,
                    minute: minute,
                },
                date: date,
                isTrueReminder: true,
            })
        );
    };

    return (
        <Dropdown
            className='bg-primary-100'
            isOpen={isOpenPicker}
            onOpenChange={() => setIsOpenPicker(!isOpenPicker)}
        >
            <DropdownTrigger>
                <Button
                    variant='light'
                    className='text-start leading-none'
                    radius='sm'
                    startContent={
                        <Icon
                            iconName='alarm-clock'
                            color={
                                todoReminder.isTrueReminder
                                    ? 'text-foreground'
                                    : ''
                            }
                        />
                    }
                    isIconOnly={todoReminder.isTrueReminder ? false : true}
                >
                    {todoReminder.isTrueReminder ? (
                        <section>
                            <span>
                                {zeroBeforeSingle(todoReminder.time.hour)}:
                                {zeroBeforeSingle(todoReminder.time.minute)}
                            </span>
                            <Subtitle
                                subtitle={dateToLocalDateString(
                                    todoReminder.date
                                )}
                                additionalClasses='text-xs'
                            />
                        </section>
                    ) : null}
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
                            <DateTimePicker todoReminder={todoReminder} />
                            <Button
                                size='sm'
                                className='m-2 bg-foreground text-background self-end'
                                onClick={() => {
                                    dispatch(setShowReminder(true));
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
                        todoReminder.isTrueReminder ? 'text-danger' : 'hidden'
                    }
                    onClick={() => dispatch(setShowReminder(false))}
                    color='danger'
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AddReminderBtn;
