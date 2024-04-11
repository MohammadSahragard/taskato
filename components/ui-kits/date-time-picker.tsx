'use client';

// public
import { useState, useEffect, useRef } from 'react';

//* components
import Calendar from './calendar';
import { Button } from '@nextui-org/react';
import Divider from '../ui/texts/divider';

//* types
import { DateTimePickerType } from '@/types/types';

//* functions
import { zeroBeforeSingle } from '@/helper/functions/functions';

const DateTimePicker = (props: DateTimePickerType) => {
    // props
    const { getDateTime, changeDateTimePicked } = props;

    // refs
    const selectedHour = useRef<HTMLButtonElement | null>(null);
    const selectedMinute = useRef<HTMLButtonElement | null>(null);

    // data
    const [hours, setHours] = useState<number[]>([]);
    const [minutes, setMinutes] = useState<number[]>([]);

    // states and variables
    const hour = 'hour';
    const minute = 'minute';
    const [mounted, setMounted] = useState(false);

    // pick time (reminder time)
    const pickTime = (event: any, item: number, type: string) => {
        event.target.scrollIntoView({
            behavior: 'smooth',
        });

        if (type === 'hour') {
            changeDateTimePicked({
                ...getDateTime,
                time: {
                    ...getDateTime.time,
                    hour: item,
                },
            });
        } else {
            changeDateTimePicked({
                ...getDateTime,
                time: {
                    ...getDateTime.time,
                    minute: item,
                },
            });
        }
    };

    //  lifecycle events
    useEffect(() => {
        const hoursItem = [];
        const minutes = [];
        for (let i = 0; i < 24; i++) hoursItem.push(i);
        for (let j = 0; j < 60; j++) minutes.push(j);
        setHours(hoursItem);
        setMinutes(minutes);
        setMounted(true);
    }, []);

    // scroll to selected time
    const scrollToViewTimeSelected = () => {
        selectedHour?.current?.scrollIntoView();
        selectedMinute?.current?.scrollIntoView();
    };
    useEffect(() => {
        scrollToViewTimeSelected();
    }, [mounted]);

    return (
        <div className='date-time-picker'>
            <Calendar
                mode='single'
                selected={getDateTime.date}
                onSelect={(date: any) =>
                    changeDateTimePicked({
                        ...getDateTime,
                        date: date,
                    })
                }
                disabled={{ before: new Date() }}
            />

            {/* time picker */}
            <div className='time-picker'>
                {/* hours section */}
                <div className='relative'>
                    <section className='time-section'>
                        {hours.map((item: number) => (
                            <Button
                                key={`hour_${item}`}
                                isIconOnly
                                size='sm'
                                variant='light'
                                className={`time-btn ${
                                    item === getDateTime?.time?.hour && 'active'
                                }`}
                                onClick={(event: any) =>
                                    pickTime(event, item, hour)
                                }
                                ref={
                                    item === getDateTime?.time?.hour
                                        ? selectedHour
                                        : null
                                }
                            >
                                {zeroBeforeSingle(item)}
                            </Button>
                        ))}
                        <div className='w-full h-[calc(100%-32px)]'></div>
                    </section>
                </div>

                <Divider orientation='vertical' />

                {/* minutes section */}
                <div className='relative'>
                    <section className='time-section'>
                        {minutes.map((item: number) => (
                            <Button
                                key={`minute_${item}`}
                                isIconOnly
                                size='sm'
                                variant='light'
                                className={`time-btn ${
                                    item === getDateTime?.time?.minute &&
                                    'active'
                                }`}
                                onClick={(event: any) =>
                                    pickTime(event, item, minute)
                                }
                                ref={
                                    item === getDateTime?.time?.minute
                                        ? selectedMinute
                                        : null
                                }
                            >
                                {zeroBeforeSingle(item)}
                            </Button>
                        ))}
                        <div className='w-full h-[calc(100%-32px)]'></div>
                    </section>
                </div>

                {/* selected area */}
                <div className='selected-section'>:</div>
            </div>
        </div>
    );
};

export default DateTimePicker;
