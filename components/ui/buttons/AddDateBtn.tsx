'use client';
import { useState } from 'react';
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
import { getDayOfWeek, getLocalDateString } from '@/helper/functions/functions';

export const AddDateBtn = () => {
    // hooks and variables
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
    const [selectedKey, setSelectedKey] = useState('');
    const [date, setDate] = useState<Date | undefined>();

    // functions
    const confirmDatePicked = (date: Date | undefined) => {
        setDate(date);
        setSelectedKey(getLocalDateString(date));
        setIsOpenDatePicker(false);
    };

    return (
        <Dropdown
            className='bg-primary-100'
            isOpen={isOpenDatePicker}
            onOpenChange={() => setIsOpenDatePicker(!isOpenDatePicker)}
        >
            <DropdownTrigger>
                <Button
                    variant='light'
                    className='capitalize'
                    startContent={
                        <Icon
                            iconName='calendar-days'
                            color='text-foreground'
                        />
                    }
                    isIconOnly={selectedKey ? false : true}
                >
                    {selectedKey}
                </Button>
            </DropdownTrigger>

            <DropdownMenu
                variant='flat'
                onSelectionChange={setSelectedKey}
            >
                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    endContent={<Subtitle subtitle={getDayOfWeek().today} />}
                    key='today'
                >
                    Today
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-arrow-down' />}
                    endContent={<Subtitle subtitle={getDayOfWeek().tomorrow} />}
                    key='tomorrow'
                >
                    Tomorrow
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-week' />}
                    endContent={<Subtitle subtitle='Saturday' />}
                    key='next-week'
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
                                onSelect={(date) => confirmDatePicked(date)}
                                disabled={{ before: new Date() }}
                            />
                            <Button
                                size='sm'
                                className='self-start mb-4 ml-4 bg-foreground text-background'
                                onClick={() => confirmDatePicked(new Date())}
                            >
                                Today
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
                    className={selectedKey ? 'text-danger' : 'hidden'}
                    onClick={() => setSelectedKey('')}
                    color='danger'
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
