'use client';

// public
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

//* components
import Calendar from './calendar';
import { Button } from '@nextui-org/react';
import Divider from '../ui/texts/divider';

//* functions
import { zeroBeforeSingle } from '@/helper/functions/functions';

//* redux
import { setTodoReminder } from '@/redux/features/todoSlice';

//* types
import { getDateTime } from '@/types/types';

const DateTimePicker = ({todoReminder}: getDateTime) => {
    // refs
    const selectedHour = useRef<HTMLButtonElement | null>(null);
    const selectedMinute = useRef<HTMLButtonElement | null>(null);

    // data
    const [hours, setHours] = useState<number[]>([]);
    const [minutes, setMinutes] = useState<number[]>([]);

    // states and variables
    const dispatch = useDispatch();
    const hour = 'hour';
    const minute = 'minute';
    const [mounted, setMounted] = useState(false);

    // pick time (reminder time)
    const pickTime = (event: any, item: number, type: string) => {
        event.target.scrollIntoView({
            behavior: 'smooth',
        });

        if (type === 'hour') {
            dispatch(setTodoReminder({
                ...todoReminder,
                time: {
                    ...todoReminder.time,
                    hour: item,
                },
            }));
        } else {
            dispatch(setTodoReminder({
                ...todoReminder,
                time: {
                    ...todoReminder.time,
                    minute: item,
                },
            }));
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
                selected={todoReminder.date}
                onSelect={(date: any) =>
                    dispatch(setTodoReminder({
                        ...todoReminder,
                        date: date,
                    }))
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
                                    item === todoReminder?.time?.hour && 'active'
                                }`}
                                onClick={(event: any) =>
                                    pickTime(event, item, hour)
                                }
                                ref={
                                    item === todoReminder?.time?.hour
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
                                    item === todoReminder?.time?.minute &&
                                    'active'
                                }`}
                                onClick={(event: any) =>
                                    pickTime(event, item, minute)
                                }
                                ref={
                                    item === todoReminder?.time?.minute
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
