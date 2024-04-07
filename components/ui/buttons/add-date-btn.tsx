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

//* data
import { days } from '@/data/data';

const AddDateBtn = () => {
    // hooks and variables
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
    const [selectedKey, setSelectedKey] = useState('');
    const [date, setDate] = useState<Date | undefined>();
    const getDate = new Date().getDay();
    const getTomorrow = getDate + 1 > 6 ? 0 : getDate + 1;

    // functions
    const confirmDatePicked = (date: Date | undefined) => {
        setDate(date);
        setSelectedKey(
            String(date?.toLocaleDateString('en-US')?.split('/')?.join('-'))
        );
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
                selectionMode='single'
                onAction={(key) =>
                    setSelectedKey(key.toLocaleString().split('-').join(' '))
                }
            >
                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    endContent={<Subtitle subtitle={days[getDate]} />}
                    key='today'
                >
                    Today
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-arrow-down' />}
                    endContent={<Subtitle subtitle={days[getTomorrow]} />}
                    key='tomorrow'
                >
                    Tomorrow
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-week' />}
                    endContent={<Subtitle subtitle={days[0]} />}
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
                                disabled={(date) => date < new Date()}
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

export default AddDateBtn;
