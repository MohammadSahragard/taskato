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

const AddReminderBtn = () => {
    // hooks and variables
    const [isOpenPicker, setIsOpenPicker] = useState(false);
    const [selectedKey, setSelectedKey] = useState({
        time: {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
        },
        date: new Date(),
        showContent: false,
    });

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
                    startContent={
                        <Icon
                            iconName='alarm-clock'
                            color='text-foreground'
                        />
                    }
                    isIconOnly={selectedKey.showContent ? false : true}
                >
                    {selectedKey.showContent ? (
                        <section>
                            <span>
                                {zeroBeforeSingle(selectedKey.time.hour)}:
                                {zeroBeforeSingle(selectedKey.time.minute)}
                            </span>
                            <Subtitle
                                subtitle={dateToLocalDateString(
                                    selectedKey.date
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
                        setSelectedKey({
                            ...selectedKey,
                            time: {
                                hour: laterTime(),
                                minute: 0,
                            },
                            showContent: true,
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
                        setSelectedKey({
                            ...selectedKey,
                            time: {
                                hour: 9,
                                minute: 0,
                            },
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
                        setSelectedKey({
                            ...selectedKey,
                            time: {
                                hour: 9,
                                minute: 0,
                            },
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
                            <DateTimePicker
                                getDateTime={selectedKey}
                                changeDateTimePicked={setSelectedKey}
                            />
                            <Button
                                size='sm'
                                className='m-2 bg-foreground text-background self-end'
                                onClick={() => {
                                    setSelectedKey({
                                        ...selectedKey,
                                        showContent: true,
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
                        selectedKey.showContent ? 'text-danger' : 'hidden'
                    }
                    onClick={() =>
                        setSelectedKey({
                            time: {
                                hour: new Date().getHours(),
                                minute: new Date().getMinutes(),
                            },
                            date: new Date(),
                            showContent: false,
                        })
                    }
                    color='danger'
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AddReminderBtn;
