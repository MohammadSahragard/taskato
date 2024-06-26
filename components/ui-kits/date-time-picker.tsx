'use client';

// Public
import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '@/redux/app/hook';

//* Components
import Calendar from './calendar';
import { Button } from '@nextui-org/react';
import Divider from '../ui/texts/divider';

//* Functions
import { zeroBeforeSingle } from '@/helper/functions/functions';

//* Redux
import { setTaskReminder } from '@/redux/features/task-data/taskDataSlice';

//* Types
import { TaskReminderTypes } from '@/types/types';

const DateTimePicker = ({
    taskReminder,
}: {
    taskReminder: TaskReminderTypes;
}) => {
    const dispatch = useAppDispatch();
    // Refs
    const selectedHour = useRef<HTMLButtonElement | null>(null);
    const selectedMinute = useRef<HTMLButtonElement | null>(null);

    // Data
    const [hours, setHours] = useState<number[]>([]);
    const [minutes, setMinutes] = useState<number[]>([]);

    // States and variables
    const hour = 'hour';
    const minute = 'minute';
    const [mounted, setMounted] = useState(false);

    // Pick time (reminder time)
    const pickTime = (event: any, item: number, type: string) => {
        event.target.scrollIntoView({
            behavior: 'smooth',
        });

        if (type === 'hour') {
            dispatch(
                setTaskReminder({
                    ...taskReminder,
                    time: {
                        ...taskReminder.time,
                        hour: item,
                    },
                })
            );
        } else {
            dispatch(
                setTaskReminder({
                    ...taskReminder,
                    time: {
                        ...taskReminder.time,
                        minute: item,
                    },
                })
            );
        }
    };

    //  Getting hours and minutes
    useEffect(() => {
        const hoursItem = [];
        const minutes = [];
        for (let i = 0; i < 24; i++) hoursItem.push(i);
        for (let j = 0; j < 60; j++) minutes.push(j);
        setHours(hoursItem);
        setMinutes(minutes);
        setMounted(true);
    }, []);

    // Scrolling to selected time
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
                selected={taskReminder.date}
                onSelect={(date: any) =>
                    dispatch(
                        setTaskReminder({
                            ...taskReminder,
                            date: date,
                        })
                    )
                }
                disabled={{ before: new Date() }}
            />

            {/* Time picker */}
            <div className='time-picker'>
                {/* Hours section */}
                <div className='relative'>
                    <section className='time-section'>
                        {hours.map((item: number) => (
                            <Button
                                key={`hour_${item}`}
                                isIconOnly
                                size='sm'
                                variant='light'
                                className={`time-btn ${
                                    item === taskReminder?.time?.hour &&
                                    'active'
                                }`}
                                onClick={(event: any) =>
                                    pickTime(event, item, hour)
                                }
                                ref={
                                    item === taskReminder?.time?.hour
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

                {/* Minutes section */}
                <div className='relative'>
                    <section className='time-section'>
                        {minutes.map((item: number) => (
                            <Button
                                key={`minute_${item}`}
                                isIconOnly
                                size='sm'
                                variant='light'
                                className={`time-btn ${
                                    item === taskReminder?.time?.minute &&
                                    'active'
                                }`}
                                onClick={(event: any) =>
                                    pickTime(event, item, minute)
                                }
                                ref={
                                    item === taskReminder?.time?.minute
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

                {/* Selected area */}
                <div className='selected-section'>:</div>
            </div>
        </div>
    );
};

export default DateTimePicker;
